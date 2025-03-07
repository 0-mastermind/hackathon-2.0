import { Opportunity } from "../models/opportunity.model.js";
import { User } from "../models/user.model.js";

export const postOpportunity = async (req, res) => {
    try {
        const { title, description, link, titleType, requiredSkills, companyName, qualificationsRequired } = req.body;
        const { userId } = req.params;

        if (!title || !description || !titleType || !requiredSkills || !companyName || !qualificationsRequired) {
            return res.status(400).json({
                success: false,
                message: "Title, description, title type, required skills, qualifications, and company name are required.",
            });
        }

        // Validate titleType
        const validTitleTypes = ["INTERNSHIP", "JOB"];
        if (!validTitleTypes.includes(titleType.toUpperCase())) {
            return res.status(400).json({
                success: false,
                message: `Invalid title type. Allowed types are: ${validTitleTypes.join(", ")}`,
            });
        }

        // Check if user is an alumni
        const user = await User.findById(userId);
        if (!user || user.accountType !== "ALUMNI") {
            return res.status(403).json({
                success: false,
                message: "Only Alumni can post opportunities.",
            });
        }

        // Create the opportunity
        const newOpportunity = await Opportunity.create({
            title,
            description,
            userId,
            link,
            titleType: titleType.toUpperCase(), // Store in uppercase for consistency
            requiredSkills,
            companyName,
            qualificationsRequired,
        });

        return res.status(201).json({
            success: true,
            message: "Opportunity posted successfully",
            opportunity: newOpportunity,
        });

    } catch (error) {
        console.error("Error posting opportunity:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to post opportunity",
            error: error.message,
        });
    }
};



export const applyForOpportunity = async (req, res) => {
    try {
        const { opportunityId } = req.query;
        const { userId } = req.params; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.accountType !== "STUDENT") {
            return res.status(403).json({
                success: false,
                message: "Only students can apply for opportunities.",
            });
        }

        
        const opportunity = await Opportunity.findById(opportunityId);
        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found",
            });
        }

        
        if (opportunity.appliedUsers.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this opportunity.",
            });
        }

      
        opportunity.appliedUsers.push(userId);
        await opportunity.save();

        return res.status(200).json({
            success: true,
            message: "Successfully applied for the opportunity.",
            opportunity,
        });
    } catch (error) {
        console.error("Error applying for opportunity:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to apply for opportunity",
            error: error.message,
        });
    }
};


