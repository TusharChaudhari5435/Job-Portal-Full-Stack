import express from 'express';
import { registerCompany, getCompanies, getCompanyById , updateCompany} from '../controllers/company.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import {singleUpload} from '../middlewares/multer.middleware.js';
const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/getCompanies").get(isAuthenticated, getCompanies);
router.route("/getCompany/:id").get(isAuthenticated, getCompanyById);
router.route("/updateCompany/:id").patch(isAuthenticated,singleUpload,updateCompany);

export default router;