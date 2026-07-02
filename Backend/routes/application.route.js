import express from 'express';
import {applyJob,getAppliedJobs,getApplicants,updateStatus} from '../controllers/application.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();
router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/getappliedjobs").get(isAuthenticated,getAppliedJobs);
router.route("/getapplicants/:id").get(isAuthenticated,getApplicants);
router.route("/updatestatus/:id").put(isAuthenticated,updateStatus);

export default router;