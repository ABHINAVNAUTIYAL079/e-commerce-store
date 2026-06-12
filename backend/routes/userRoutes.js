import express from "express";
import {createUser , loginUser, logoutCurrentUser, getAllUsers , getCurrentUserProfile , updateProfile} from "../controllers/userController.js";
import { authincateUser , authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser).get(authincateUser,authorizeAdmin ,getAllUsers);
router.post("/auth" , loginUser);
router.post("/logout" , logoutCurrentUser);
router.route("/profile").get(authincateUser , getCurrentUserProfile).put(authincateUser, updateProfile);
export default router;
