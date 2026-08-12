import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: [
        "admin",
        "medecin",
        "infirmier",
        "receptionniste",
        "pharmacien",
        "comptable",
        "patient",
      ],
      default: "patient",
    },
    name: {
      type: String,
      required: [true, "le nom est obligatoire"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "l'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "le mot de passe est obligatoire "],
      minlength: [6, "le mot de passe doit contenir au moins 6 caractères"],
    },
    profilePicture: {
      type: String,
      default: "default-avatar.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive:{
      type: Boolean,
      default: false,
    },
    otpCode: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
