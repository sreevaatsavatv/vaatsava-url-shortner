// src/routes/userRouter.js (or .ts)
import { Router } from "express";
import { getUserProfile } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/me", isLoggedIn, getUserProfile);

export default userRouter;
