import { prisma } from "@repo/db";
import { Request, Response } from "express";

export const getChats = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  const userId = req.userId;

  try {
    const room = await prisma.room.findFirst({
      where: {
        id: roomId?.toString(),
      },
      include: {
        members: {
          where: {
            userId: userId,
          },
        },
      },
    });

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const isMember = room.adminId === userId || room.members.length > 0;

    if (!isMember) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const chats = await prisma.chat.findMany({
      where: {
        roomId: roomId?.toString(),
      },
      orderBy: {
        id: "asc",
      },
      take: 1000,
    });

    const response = chats.map((chat) => {
      return {
        id: chat.id,
        message: chat.message,
        createdAt: chat.createdAt,
      };
    });

    res.status(200).json({
      response,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ msg: "Error fetching messages" });
  }
};