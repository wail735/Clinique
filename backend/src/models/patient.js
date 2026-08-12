import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "le nom est obligatoire"],
    },

    dateofBirth: {
      type: Date,
      required: [true, "la date de naissance est obligatoire"],
    },

    gender: {
      type: String,
      required: [true, "le genre est obligatoire"],
    },

    phone: {
      type: String,
    },

    bloodGroup: {
      type: String,
    },

    allergies: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // pour ajouter automatiquement createdAt et updatedAt a chaque patient
  },
);

const patientModel =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

export default patientModel;
