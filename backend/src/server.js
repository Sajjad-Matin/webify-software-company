import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import teamRoute from "./routes/team.route.js";
import projectRoute from "./routes/projects.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Serve uploaded images from the public/images folder
app.use(
  "/images",
  express.static(path.join(process.cwd(), "public", "images"))
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/team", teamRoute);
app.use("/api/project", projectRoute);
app.use("/api/message", messageRoute);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  })
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
