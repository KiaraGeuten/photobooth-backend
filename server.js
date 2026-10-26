import express from "express";
import { connectDB } from "./database.js";
import cors from "cors";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Home route
app.get("/", (req, res) => {
  res.send("Helllooo");
});

// Start server after database connection
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
