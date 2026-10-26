import { getDB } from "./database.js";

import express from "express";

const router = express.Router();

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

router.post("/", async (req, res) => {
  try {
    const { imageUrl, code } = req.body;

    // Check if the required data exists
    if (!imageUrl || !code) {
      return res.status(400).json({
        message: "Image URL and code are required",
      });
    }

    const db = getDB();

    // Save image in MongoDB
    const result = await db.collection("img").insertOne({
      imageUrl,
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

export default router;
