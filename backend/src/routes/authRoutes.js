import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  sendBulkNotification,
  getMe,
  verifyOtp, 
  resendOtp,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { checkRole } from "../middlewares/roleMiddelware.js";

const router = express.Router();
router.post("/verify-otp", verifyOtp)
router.post("/resend-otp", resendOtp);

router.post("/signup", upload.single("profilePicture"), signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);
router.post("/send-bulk", protect, checkRole("admin"), sendBulkNotification);
router.get("/me", protect, getMe);
export default router;
