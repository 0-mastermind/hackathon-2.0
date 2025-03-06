import { Event } from "../models/events.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.config.js";

export const createEvent = async (req, res) => {
    try {
        const { title, description, link, eventDate } = req.body;
        const { userId } = req.params;
        const eventImage = req.files.eventImage; 

        if (!title || !description || !eventDate || !eventImage) {
            return res.status(400).json({
                success: false,
                message: "Title, description, event date, and event image are required",
            });
        }

        const uploadedImage = await uploadOnCloudinary(eventImage[0]?.path, "events");

        const createdEvent = await Event.create({
            title,
            description,
            userId,
            link,
            eventDate,
            image: {
                publicId: uploadedImage.public_id,
                url: uploadedImage.url,
              },
        });

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: createdEvent, 
        });

    } catch (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create event",
            error: error.message,
        });
    }
};


export const applyEvent = async (req, res) => {
    try {
        const { eventId } = req.params; 
        const {userId} = req.query; 
        
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        if (event.appliedUsers.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this event",
            });
        }

       
        event.appliedUsers.push(userId);
        await event.save();

        return res.status(200).json({
            success: true,
            message: "Successfully applied for the event",
            event,
        });
    } catch (error) {
        console.error("Error applying for event:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to apply for the event",
            error: error.message,
        });
    }
};

