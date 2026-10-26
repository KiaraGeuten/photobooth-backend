import express from "express";
import { connectDB } from "./database.js";

const app = express();

// Middleware
app.use(express.json());

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
