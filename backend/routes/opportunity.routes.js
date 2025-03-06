import { Router } from "express";
import { applyForOpportunity, postOpportunity } from "../controllers/opportunity.controller.js";

const opportunityRouter = Router();


opportunityRouter.route("/:userId/create").post(postOpportunity);
opportunityRouter.route("/:userId/apply").post(applyForOpportunity);

export default opportunityRouter;