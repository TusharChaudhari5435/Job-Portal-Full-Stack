import multer from "multer";

// storage configuration
const storage = multer.memoryStorage();

// multer middleware
export const singleUpload = multer({ storage }).single("file");