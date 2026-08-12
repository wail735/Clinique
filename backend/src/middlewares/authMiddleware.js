import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "Utilisateur introuvable" });
      }
      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Non autorisé , jeton invalide ou expiré" });
    }
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "Non autorisé , aucun jeton fourni " });
  }
};
