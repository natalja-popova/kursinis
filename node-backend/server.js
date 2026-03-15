import "dotenv/config";
import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import AdminRouter from "./src/router/admin.js";
import GalleryRouter from "./src/router/gallery.js";
import CoursesRouter from "./src/router/courses.js";

const app = express();
app.use(express.json());

// Allow frontend (Vercel + localhost). 502 shows as CORS when server doesn't respond.
app.use(
  cors({
    origin: true, // reflect request origin, or set e.g. ["https://your-app.vercel.app", "http://localhost:3000"]
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false,
  })
);

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/gallery", express.static("gallery"));

app.get("/health", (req, res) => res.status(200).json({ ok: true }));

app.use(AdminRouter);
app.use(GalleryRouter);
app.use(CoursesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "This endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
