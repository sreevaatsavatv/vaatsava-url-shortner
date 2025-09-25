import { ShortURL } from "../models/shorturl.model.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customUrl, expiresAt, title } = req.body;
    const userId = req.user.id;

    if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required" });
    }

    let shortCode;

    if (customUrl) {
      shortCode = customUrl;
      const exist = await ShortURL.findOne({ shortCode });
      if (exist) {
        return res.status(400).json({
          message: "Please try a different Short Code",
        });
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
      // expiresAt: expiresAt ? new Date(expiresAt) : null,
      title,
    });

    await newShortUrl.save();
    return res.status(201).json(newShortUrl);
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getLongUrl = async (req, res) => {
  const { shortCode } = req.params;

  if (!shortCode) {
    return res.status(400).json({
      status: "BAD_REQUEST",
      message: "Short Code is required",
    });
  }

  try {
    const urlRecord = await ShortURL.findOne({ shortCode });
    if (!urlRecord) {
      return res.status(404).json({
        status: "NOT_FOUND",
        message: "Short URL not found",
      });
    }

    return res.redirect(urlRecord.originalUrl);
  } catch (error) {
    console.error("Error fetching short URL:", error);
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Error fetching short URL",
    });
  }
};

export const updateShortURLController = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const updatedData = req.body;

    const existed = await ShortURL.findOne({ shortCode });
    if (!existed) {
      return res.status(404).json({
        status: "NOT_FOUND",
        message: "Short URL not found",
      });
    }

    const updatedRecord = await ShortURL.findOneAndUpdate(
      { shortCode },
      { ...updatedData },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating short URL:", error);
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Error updating short URL",
    });
  }
};

export const deleteShortURLController = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const existed = await ShortURL.findOne({ shortCode });
    if (!existed) {
      return res.status(404).json({
        status: "NOT_FOUND",
        message: "Short URL not found",
      });
    }

    // Soft delete
    existed.isActive = false;
    await existed.save();

    // Hard delete (uncomment if you want permanent deletion)
    // await ShortURL.findOneAndDelete({ shortCode });

    return res.status(200).json({
      status: "success",
      message: "Short URL deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting short URL:", error);
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Error deleting short URL",
    });
  }
};
