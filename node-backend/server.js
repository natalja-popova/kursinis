import "dotenv/config";
import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import AdminRouter from "./src/router/admin.js";
import GalleryRouter from "./src/router/gallery.js";

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const customFolder = req.body.albumName;
    const folder = `gallery/${customFolder}`;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(AdminRouter);
app.use(GalleryRouter);

app.post("/uploads", upload.array("images"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(500).json({ error: "Nepavyko ikelti nuotrauku" });
  }
  const paths = req.files.map(
    (file) => `/gallery/${req.body.albumName}/${file.filename}`,
  );
  res.json({ paths });
});

app.use((req, res) => {
  res.status(404).json({ message: "This endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
