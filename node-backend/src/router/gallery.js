import express from "express";
import {
  getAllAlbums,
  UploadGallery,
  deleteImages,
  deleteAlbum,
} from "../controllers/gallery.js";
import { upload } from "../middleware/upload.js";
const router = express.Router();
router.get("/getAllAlbums", getAllAlbums);
router.post("/uploads", upload.array("images"), UploadGallery);
router.delete("/deleteImages", deleteImages);
router.delete("/deleteAlbum/:albumName", deleteAlbum);
export default router;
