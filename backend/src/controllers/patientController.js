import express from "express";
import patientModel from "../models/patient.js";
const createPatient = async (req, res) => {
  try {
    const patient = new patientModel({
      fullName: req.body.fullName,
      dateofBirth: req.body.dateofBirth,
      gender: req.body.gender,
      phone: req.body.phone,
      bloodGroup: req.body.bloodGroup,
      allergies: req.body.allergies,
    });
    await patient.save();
    return res
      .status(200)
      .json({ success: true, message: "patient creé avec succés" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
export { createPatient };
