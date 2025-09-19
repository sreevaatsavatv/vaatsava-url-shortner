import { ShortURL } from "../models/shorturl.model.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customUrl, expiresAt, title } = req.body;
    const userId = req.user.id;
    if (!originalUrl) {
      console.log("originalUrl is required");
      return res.status(400).json({ message: "originalUrl is required" });
    }
    let shortCode;
    if (customUrl) {
      shortCode = customUrl;
      const exist = await ShortURL.findOne({ shortCode });
      if (exist) {
        console.log("Custom Short Code already in use");
        return res
          .status(400)
          .json({ message: "Please try a different Short Code" });
      }
    } else {
      shortCode = nanoid(7);
      let exist = await ShortURL.findOne({ shortCode });
      while (exist) {
        shortCode = nanoid(7);
        exist = await ShortURL.findOne({ shortCode });
      }
    }
    const newShortUrl = new ShortURL({
      originalUrl,
      shortCode,
      userId,
      //   expiresAt: expiresAt ? new Date(expiresAt) : null,
    });
    await newShortUrl.save();
    return res.status(201).json({ newShortUrl });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getLongUrl = async (req, res) => {
  try {
    const shortCode = req.params.shortcode;
    const exist = await ShortURL.findOne({ shortCode });
    if (!exist) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    return res.redirect(exist.originalUrl);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
