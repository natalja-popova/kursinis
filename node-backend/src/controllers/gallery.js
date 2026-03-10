import AlbumModel from "../models/gallery.js";
import { v4 as uniqueID } from "uuid";
export const UploadGallery = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(500).json({ error: "Nepavyko ikelti nuotrauku" });
  }
  const paths = req.files.map(
    (file) => `/gallery/${req.body.albumName}/${file.filename}`,
  );
  const albumName = req.body.albumName;
  const albumDescription = req.body.albumDescription;

  let album = await AlbumModel.findOne({ albumName: albumName });
  console.log("album", album);
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
