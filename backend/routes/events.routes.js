import { Router } from "express";
import { applyEvent, createEvent } from "../controllers/event.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";

const eventsRouter = Router();

const fileUploads = multerUpload.fields([
  {
      name: "eventImage",
      maxCount: 1,  
  },
]);


eventsRouter.route("/:userId/create").post(fileUploads, createEvent); 
eventsRouter.route("/:eventId/apply").post(fileUploads, applyEvent); 

export default eventsRouter;