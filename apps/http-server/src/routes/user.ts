import { Router } from "express";
import {
  logoutController,
  signinController,
  signupController,
} from "../controllers/userControllers";
import { githubCallback, githubLogin } from "../controllers/authControllers";

const userRouter: Router = Router();

userRouter.post("/signin", signinController);
userRouter.post("/signup", signupController);
userRouter.post('/logout', logoutController);

// OAuth routes
userRouter.get("/github", githubLogin);
userRouter.get("/github/callback", githubCallback);

export default userRouter;