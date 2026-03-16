import express from "express";
import {
  getAllAlbums,
  UploadGallery,
  deleteImages,
  deleteAlbum,
} from "../controllers/gallery.js";
import { upload } from "../middleware/upload.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/getAllAlbums", getAllAlbums);
router.post("/uploads", auth, upload.array("images"), UploadGallery);
router.delete("/deleteImages", auth, deleteImages);
router.delete("/deleteAlbum/:albumName", auth, deleteAlbum);
export default router;
