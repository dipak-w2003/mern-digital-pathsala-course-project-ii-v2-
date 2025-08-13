// Offline Method
import { Request } from "express";
import { multer, storage } from "./multer.middleware";
export const upload = multer({
  storage: storage,
  // simple File Validation
  // cb(error,success)

  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const allowedFileTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
    ];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Only Image File is supportted !!!"));
  },
  limits: {
    // 2mb
    fileSize: 4 * 1024 * 1024,
  },
});
