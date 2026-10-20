//server app setup
import express from "express";
const app = express();
const port = 3000;

//db conncect
import { connectDB } from "./database.js";

await connectDB();

//handled as json
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.send("Helllooo");
});
