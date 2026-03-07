import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db";
import { JWT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, FE_URL } from "@repo/backend-config/config";

export const githubLogin = (req: Request, res: Response) => {
  console.log("GitHub Login Initiative - Client ID:", GITHUB_CLIENT_ID);
  if (!GITHUB_CLIENT_ID) {
    return res.status(500).json({ msg: "GITHUB_CLIENT_ID is not configured on the server." });
  }
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`;
  res.redirect(redirectUri);
};

export const githubCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ msg: "No code provided" });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get user info from GitHub
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { id: githubId, name, email } = userResponse.data;

    // GitHub might not return an email if it's private, so we fetch it separately
    let userEmail = email;
    if (!userEmail) {
      const emailsResponse = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const primaryEmail = emailsResponse.data.find((e: any) => e.primary);
      userEmail = primaryEmail ? primaryEmail.email : null;
    }

    if (!userEmail) {
      return res.status(400).json({ msg: "GitHub account must have an email" });
    }

    // Find or create user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { githubId: githubId.toString() },
          { email: userEmail }
        ]
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: name || userEmail.split("@")[0],
          githubId: githubId.toString(),
        },
      });
    } else if (!user.githubId) {
      // Link GitHub account to existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: { githubId: githubId.toString() },
      });
    }

    // Sign JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET as string);

    // Redirect to frontend with token
    let targetUrl = FE_URL || "http://localhost:3000";
    if (!targetUrl.startsWith("http")) {
      targetUrl = `https://${targetUrl}`;
    }
    
    res.redirect(`${targetUrl}/auth-callback?token=${token}&name=${user.name}`);
  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    res.status(500).json({ msg: "Authentication failed" });
  }
};
