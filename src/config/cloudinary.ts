import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "fileUploader",
      allowed_formats: ["jpg", "png", "pdf", "docx", "mp4", "zip", "webp"],
      public_id: file.originalname.split(".")[0],
    };
  },
});

export { cloudinary, storage };
