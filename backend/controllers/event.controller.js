import { Event } from "../models/events.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.config.js";
import { mongoose } from "mongoose";

export const createEvent = async (req, res) => {
    try {
        const { title, description, link, eventDate , category} = req.body;
        const { userId } = req.params;
        const eventImage = req.files.eventImage; 

        if (!title || !description || !eventDate || !eventImage || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, description, event date, category and event image are required",
            });
        }

        const uploadedImage = await uploadOnCloudinary(eventImage[0]?.path, "events");

        const createdEvent = await Event.create({
            title,
            description,
            userId,
            link,
            eventDate,
            category,
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
        const { eventId } = req.query; 
        const {userId} = req.params; 
        
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

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Validate EventId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid event ID" });
    }

    // Find and delete the Event
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      deletedEvent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting Event",
    });
  }
};

export const searchEvents = async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category is required for searching events.",
            });
        }
        
        const events = await Event.find({ category: category.toUpperCase() });

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No events found matching your category.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Events retrieved successfully.",
            events,
        });
    } catch (error) {
        console.error("Error searching events:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to search for events.",
            error: error.message,
        });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            events,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

