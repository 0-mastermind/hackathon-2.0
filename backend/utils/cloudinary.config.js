import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
import sharp from "sharp"; // For image compression
import { Readable } from "stream"; // To handle streams

configDotenv("./.env");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Compress and upload image directly to Cloudinary
const uploadOnCloudinary = async (fileBuffer, folderName, quality = 60) => {
  try {
    if (!fileBuffer) {
      throw new Error("No file buffer provided");
    }

    // Compress the image in memory using sharp
    const compressedImageBuffer = await sharp(fileBuffer)
      .jpeg({ quality }) // Adjust quality (0-100)
      .toBuffer();

    // Convert the buffer to a readable stream
    const readableStream = new Readable();
    readableStream.push(compressedImageBuffer);
    readableStream.push(null); // Signal end of stream

    // Upload the compressed image directly to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: folderName,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Pipe the readable stream to Cloudinary upload stream
      readableStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

// Update image on Cloudinary (delete old and upload new)
const updateOnCloudinary = async (fileBuffer, folderName, publicId, quality = 60) => {
  try {
    if (!fileBuffer) {
      throw new Error("No file buffer provided");
    }

    // Delete the existing image on Cloudinary
    const deleteResult = await cloudinary.uploader.destroy(publicId);
    if (deleteResult.result !== "ok") {
      throw new Error("Unable to delete existing image");
    }

    // Upload the new compressed image directly to Cloudinary
    const uploadResult = await uploadOnCloudinary(fileBuffer, folderName, quality);
    return uploadResult;
  } catch (error) {
    console.error("Error updating on Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary, updateOnCloudinary };