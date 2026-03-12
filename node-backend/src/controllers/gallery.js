import AlbumModel from "../models/gallery.js";
import { v4 as uniqueID } from "uuid";
import path from "path";
import fs from "fs";

export const UploadGallery = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(500).json({ error: "Nepavyko įkelti nuotraukų" });
    }
    const paths = req.files.map(
      (file) => `/gallery/${req.body.albumName}/${file.filename}`,
    );
    const albumName = req.body.albumName;
    const albumDescription = req.body.albumDescription;

    let album = await AlbumModel.findOne({ albumName: albumName });

    if (!album) {
      album = new AlbumModel({
        id: uniqueID(),
        albumName: albumName,
        description: albumDescription,
        images: paths,
      });
    } else {
      paths.forEach((path) => {
        if (!album.images.includes(path)) {
          album.images.push(path);
        }
      });

      if (albumDescription) {
        album.description = albumDescription;
      }
    }
    await album.save();
    res.json({ paths }, album);
  } catch (err) {
    console.error("UploadGallery error:", err);
    return res.status(500).json({
      error: "Įvyko serverio klaida įkeliant nuotraukas",
      details: err.message,
    });
  }
};

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await AlbumModel.find();
    res.status(200).json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load albums" });
  }
};

export const deleteImages = async (req, res) => {
  const { images } = req.body;

  try {
    for (const item of images) {
      const { album, image } = item;
      console.log("item", item, "album=", album, "image", image);

      const fileName = image.split("/").pop();

      const filePath = path.join("gallery", album, fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await AlbumModel.updateOne(
        { albumName: album },
        { $pull: { images: image } },
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Klaida" });
  }
};

export const deleteAlbum = async (req, res) => {
  const { albumName } = req.params;
  try {
    const folderPath = path.join("gallery", albumName);

    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }

    await AlbumModel.deleteOne({ albumName });

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Klaida trinant albumą" });
  }
};
