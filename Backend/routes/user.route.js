import express from 'express';
import { register, login, updateProfile , logout} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import {singleUpload} from '../middlewares/multer.middleware.js';

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").patch(isAuthenticated, singleUpload, updateProfile);
router.route("/logout").post(isAuthenticated, logout);

export default router;