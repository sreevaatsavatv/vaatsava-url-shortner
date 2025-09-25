// src/routes/userRouter.js (or .ts)
import { Router } from "express";
import { getMyUrls, getUserProfile } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/me", isLoggedIn, getUserProfile);
userRouter.get("/my/urls", isLoggedIn, getMyUrls);
export default userRouter;
