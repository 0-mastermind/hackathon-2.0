import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.config.js";

const createPost = async (req, res) => {
  try {
    const { title } = req.body;
    const { postImage } = req.files;
    const userId = req.query;
        
    if (!title && !postImage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    
    const uploadedImage = await uploadOnCloudinary(postImage[0]?.path, "posts");
    
    const createdPost = await Post.create({
      title, 
      image: {
        publicId: uploadedImage.public_id,
        url: uploadedImage.url,
      },
      userId
    });
    
    return res.status(200).json({
      success: true,
      message: "User Created Successfully!",
      createdPost,
    })
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: "Error! While creating post"
    })
  }
};

export { createPost };
