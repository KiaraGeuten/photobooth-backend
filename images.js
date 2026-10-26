import { getDB } from "./database.js";

import express from "express";

const router = express.Router();

import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

router.get("/", async (req, res) => {
  console.log("GET /images was called");

  try {
    const db = getDB();
    console.log("Database found!");

    const images = await db.collection("img").find({}).toArray();
    console.log("Images retrieved:", images.length);

    res.send(images);
  } catch (error) {
    console.error("MongoDB error:", error);

    res.status(500).json({
      message: "Error displaying images",
      error: error.message,
    });
  }
});

// no multer
router.post("/", async (req, res) => {
  try {
    const { image, code } = req.body;

    // Check if the required data exists
    if (!image || !code) {
      return res.status(400).json({
        message: "Image URL and code are required",
      });
    }

    const db = getDB();

    // Save image in MongoDB
    const result = await db.collection("img").insertOne({
      image,
      code,
    });

    res.status(201).json({
      message: "Image saved successfully!",
      imageId: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving image:", error);

    res.status(500).json({
      message: "Error saving image",
      error: error.message,
    });
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { code } = req.body;

    if (!req.file || !code) {
      return res.status(400).json({
        message: "Image and code are required",
      });
    }

    const db = getDB();

    const result = await db.collection("img").insertOne({
      code,
      image: req.file.buffer,
      contentType: req.file.mimetype,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Photo uploaded successfully!",
      id: result.insertedId,
      code,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Error uploading photo",
      error: error.message,
    });
  }
});

export default router;
