import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";

import userRoutes from "./routes/users.routes.js";
import blogRoutes from "./routes/blogposts.routes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/blogposts", blogRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`connected to server on port ${PORT}`);
});
