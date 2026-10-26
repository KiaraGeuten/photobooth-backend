import express from "express";
import cors from "cors";

import { connectDB } from "./database.js";
import imagesRoutes from "./images.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
await connectDB();

// Home route
app.get("/", (req, res) => {
  res.send("Helllooo");
});

// Images routes
app.use("/images", imagesRoutes);

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
