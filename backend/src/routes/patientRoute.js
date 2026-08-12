import express from "express";
import { createPatient } from "../controllers/patientController.js";
import { checkRole } from "../middlewares/roleMiddelware.js";
import { protect } from "../middlewares/authMiddleware.js";

const patientRoute = express.Router();

patientRoute.post(
  "/",
  protect,
  checkRole("admin", "receptionniste"),
  createPatient,
);

export default patientRoute;
