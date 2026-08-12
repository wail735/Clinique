import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import patientRoute from "./src/routes/patientRoute.js";
import connectDB from "./src/config/db.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL })); //pour autoriser les requete de frontend
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoute);
app.get("/", (req, res) => {
  res.send("API clinique Ok");
});
app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
