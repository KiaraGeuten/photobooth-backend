import express from "express";
import cors from "cors";

//db conncect
import { connectDB } from "./database.js";

await connectDB();

//server app setup
const app = express();
const port = 3000;

// Home route
app.get("/", (req, res) => {
  res.send("Helllooo");
});

import imagesRoutes from "./images.js";

app.use(express.json());
app.use(cors());
app.use("/images", imagesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
