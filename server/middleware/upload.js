
import path from "path";
import multer from "multer";

// No disk storage — keep file in memory buffer
const storage = multer.memoryStorage();
export const upload = multer({ storage });

