import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is missing from environment variables");
}

const client = new MongoClient(uri);

let db;

export async function connectDB() {
  try {
    await client.connect();

    db = client.db("experienceDesign3");

    await db.command({ ping: 1 });

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database is not connected. Call connectDB() first.");
  }

  return db;
}
