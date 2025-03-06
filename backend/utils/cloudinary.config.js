import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";

configDotenv("./.env");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Upload image on cloudinary
const uploadOnCloudinary = async (localFilePath, folderName) => {
    try {
        if (!localFilePath) {
            return null;
        }        

        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: folderName
        });        
        return response;
    } catch (error) {
        return null;
    }
};

// Update image on cloudinary
const updateOnCloudinary = async (localFilePath, folderName, publicId) => {
    try {
        if (!localFilePath) {
            return null;
        }
        
        // will delete the existing image
        const deleteFile = await cloudinary.uploader.destroy(publicId);
        
        if (!deleteFile) throw new Error("Image is unable to update!!");
        
       // will upload the image to cloudinary!! 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: folderName,
        });
        
        return response;
    } catch (error) {
        
        return null;
    }
}


export { uploadOnCloudinary, updateOnCloudinary };
