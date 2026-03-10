import express from "express";
import { getAllAlbums, UploadGallery } from "../controllers/gallery.js";
import { upload } from "../middleware/upload.js";
const router = express.Router();
router.get("/getAllAlbums", getAllAlbums);
router.post("/uploads", upload.array("images"), UploadGallery);
export default router;
