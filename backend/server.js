import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`connected to server on port ${PORT}`);
});
