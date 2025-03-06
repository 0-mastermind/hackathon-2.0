import multer from "multer";

// directly uploading form user 
const storage = multer.diskStorage({});
  
export const multerUpload = multer({ storage });