import mongoose from "mongoose";

const connectDB = async () => {
    const URI = process.env.MONGODB_URI
    try {
        await mongoose.connect(URI);
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.log("Error! While connecting to database!", error);
        process.exit(0);
    }
}

export default connectDB;