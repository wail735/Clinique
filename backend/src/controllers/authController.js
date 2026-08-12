import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendSingleEmail, sendBulkEmails } from "../utils/sendMail.js";

import dotenv from "dotenv";

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name||!email || !password){
      return res.status(400).json({success:false, message:"il faut remplir tous les champs"})
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success:false, message: "cet email est deja utilisé" });
    }
    const profilePicture = req.file ? req.file.filename : "default-avatar.png";
    const generatedOtp= Math.floor(100000 +Math.random()*900000).toString();// generer un numero aleatoire de 6 chiffre
    const expireTime = new Date (Date.now() +10*60*1000);// exprire dans 10 minute
    const user = await User.create({
      name,
      email,
      password,
      profilePicture,
      otpCode:generatedOtp,
      otpExpiresAt:expireTime,
    });
    await sendSingleEmail({
      to:email,
      subject:"Vérification de votre compte-clinique",
      text: `Bonjour ${name}, \n\nBienvenu à la clinique! Voici votre code de vérification: ${generatedOtp}\n\nCe code expirera dans 10 minutes`
    })
    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const login = async (req , res) =>{
  try{
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({success:false, message:"Veuillez fournir un email et un mot de passe"})
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success:false, message:"email ou mot de passe incorrect"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({success:false, message:"email ou mot de passe incorrect"})
    }
    res.status(200).json({
      success:true,
      _id: user._id,
      name:user.name,
      email:user.email,
      profilePicture:user.profilePicture,
      token:generateToken(user._id),
    })
  }
  catch(error){
    res.status(500).json({success:false, message:error.message})
  }
}

// reset password

export const forgotPassword = async( req , res) =>{

  try{
     const {email} = req.body;
     if(!email){
      return res.status(400).json({success:false, message:"Veuillez fournir un email"})
     }
     const user = await User.findOne({email});
     if(!user){
      return res.status(400).json({success:false, message:"utilisateur non trouvé"})
     }
     const resetToken = crypto.randomBytes(32).toString("hex");
     const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
     user.resetPasswordToken = hashedToken;
     user.resetPasswordExpire = Date.now() + 60*60*1000;
     await user.save();
     await sendSingleEmail({
      to: email,
      subject:"Réinitialisation de votre mot de passe",
      text:`Cliquez sur ce lien pour réinitialiser votre mot de passe : ${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
     })
     return res.status(200).json({success:true, message:"email de reset envoyé"})
  }catch (error){
    return res.status(500).json({success:false, message:error.message})
  }
}

export const resetPassword = async( req , res) =>{
  try{
    const { resetToken } = req.params;
    const { password } = req.body;
    if(!resetToken || !password){
      return res.status(400).json({success:false, message:"Veuillez fournir un token et un nouveau mot de passe"})
    }

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {$gt: Date.now()}
    })
    
    if(!user){
      return res.status(400).json({success:false, message:"token non valide ou expiré"})
    }
    
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    return res.status(200).json({success:true, message:"mot de passe reset avec succes"})
  }catch (error){
    return res.status(500).json({success:false, message:error.message})
  }
}

// Permet au frontend de récupérer les infos de l'utilisateur connecté
export const getMe = async (req , res)=>{
  try{
    const user =  await User.findById(req.user._id).select("-password");
    res.status(200).json({success:true, user})
  }catch(error){
    res.status(500).json({success:false, message:error.message})
  }
}

export const sendBulkNotification = async ( req , res)=>{
  
  try{
    const {title , message} = req.body;
    if(!title || !message){
      return res.status(400).json({success:false, message:"titre et message requis"})
    }
    const users = await User.find({}).select("email");
    if(!users.length){
      return res.status(400).json({success:false, message:"aucun utilisateur trouvé"})
    }
    const emails = users.map((user) => user.email);
    await sendBulkEmails({emails, title, message});
    res.status(200).json({success:true, message:"Notifications envoyées avec succès"});

  }catch(error){
    res.status(500).json({success:false, message:error.message})
  }

}

export const verifyOtp = async (req , res) =>{
  try{
     const{email, otpCode} =  req.body;
     if(!email || !otpCode){
      return res.status(400).json({success:false, message:"Emailet code OTP sont requis"})
     }
     const user = await User.findOne({email})
     if(!user){
        return res.status(400).json({success:false,message:"utilisateur non trouvé"})
     }
     if(user.otpCode !== otpCode ){
      return res.status(400).json({success:false, message:"Code otp invalide"})
     }
     if(user.otpExpiresAt < Date.now()){
      return res.status(400).json({success:false, message:"code otp expiré"})
     }
     user.isVerified = true;
     user.otpCode = undefined;
     user.otpExpiresAt = undefined;
     await user.save();
     return res.status(200).json({success:true, message:"compte activé avec succes"})
  }catch(error){
    return res.status(500).json({success:false, message:error.message})
  }
} 

// Fonction pour Renvoyer un nouveau code OTP
export const resendOtp = async (req, res) => {
  try {
    // Le Frontend nous envoie l'email
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: "Email requis" });
    }

    // On cherche l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Utilisateur introuvable" });
    }
    
    // S'il est déjà vérifié, pas besoin de renvoyer un code
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Compte déjà vérifié" });
    }

    // 1. On génère un NOUVEAU code et une nouvelle date d'expiration
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expireTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 2. On met à jour l'utilisateur dans la base de données
    user.otpCode = generatedOtp;
    user.otpExpiresAt = expireTime;
    await user.save();

    // 3. On renvoie le vrai email avec le nouveau code
    await sendSingleEmail({
      to: email,
      subject: "Nouveau code de vérification - Clinique",
      text: `Bonjour ${user.name},\n\nVoici votre nouveau code de vérification : ${generatedOtp}\n\nCe code expirera dans 10 minutes.`
    });

    return res.status(200).json({ success: true, message: "Un nouveau code a été envoyé." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
