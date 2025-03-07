import { Router } from "express";
import { applyEvent, createEvent, deleteEvent, getAllEvents } from "../controllers/event.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";
import { searchEvents } from "../controllers/event.controller.js";

const eventsRouter = Router();

const fileUploads = multerUpload.fields([
  {
      name: "eventImage",
      maxCount: 1,  
  },
]);


eventsRouter.route("/:userId/create").post(fileUploads, createEvent); 
eventsRouter.route("/:userId/apply").post(fileUploads, applyEvent); 
eventsRouter.route("/search").post(fileUploads, searchEvents); 
eventsRouter.route("/:eventId/delete").post(fileUploads, deleteEvent); 
userRouter.route("/getAll").post(getAllEvents);



export default eventsRouter;