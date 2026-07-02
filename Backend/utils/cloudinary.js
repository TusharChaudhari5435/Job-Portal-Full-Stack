import { v2 as cloudinary } from 'cloudinary';
import DataURIParser from "datauri/parser.js";
import path from "path";
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const getDataUri = (file) => {
    const parser = new DataURIParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
};

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) return null;

        const fileUri = getDataUri(file);

        const response = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "auto", 
            folder: "jobportal_resumes",
            content_type: "application/pdf",
            content_disposition: "inline"
        });

        return response;

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

export { uploadOnCloudinary };