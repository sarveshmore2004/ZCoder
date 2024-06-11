import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import path from "path";
import userRoutes from "./routes/users.routes.js";
import blogRoutes from "./routes/blogposts.routes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/blogposts", blogRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`connected to server on port ${PORT}`);
});
