import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connexion reussie`);
  } catch (error) {
    console.error("erreur de connexion mongodb", error.message);
    process.exit(1);
  }
};

export default connectDB;
