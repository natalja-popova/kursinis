import "dotenv/config";
import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import AdminRouter from "./src/router/admin.js";
import GalleryRouter from "./src/router/gallery.js";
import CoursesRouter from "./src/router/courses.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/gallery", express.static("gallery"));

app.use(AdminRouter);
app.use(GalleryRouter);
app.use(CoursesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "This endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
