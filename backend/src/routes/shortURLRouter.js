import { Router } from "express";
import {
  createShortUrl,
  deleteShortURLController,
  getLongUrl,
  updateShortURLController,
} from "../controllers/shortUrlController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const shortURLRouter = Router();

shortURLRouter.post("/", isLoggedIn, createShortUrl);

shortURLRouter.get("/:shortCode", getLongUrl);

shortURLRouter.patch("/:shortCode", updateShortURLController);

shortURLRouter.delete("/:shortCode", deleteShortURLController);

export default shortURLRouter;
