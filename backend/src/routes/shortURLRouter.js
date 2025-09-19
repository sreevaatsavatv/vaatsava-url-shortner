import { Router } from "express";
import {
  createShortUrl,
  getLongUrl,
} from "../controllers/shortUrlController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const shortURLRouter = Router();

shortURLRouter.post("/", isLoggedIn, createShortUrl);

shortURLRouter.get("/:shortcode", getLongUrl);

export default shortURLRouter;
