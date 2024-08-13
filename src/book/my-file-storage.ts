import * as multer from 'multer';
import * as fs from 'fs';
import { join } from 'path';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const targetDir = join(process.cwd(), 'upload');
    try {
      fs.mkdirSync(targetDir);
    } catch (e) {}

    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});
