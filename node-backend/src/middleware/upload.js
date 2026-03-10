import fs from "fs";
import multer from "multer";

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

export const upload = multer({ storage });
