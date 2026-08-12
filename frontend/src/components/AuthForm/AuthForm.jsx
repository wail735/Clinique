import React, { useState, useEffect , useContext} from "react";
import "./AuthForm.css";
import axios from "axios";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const AuthForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // -------------------------
  // 1. ÉTATS (STATES)
  // -------------------------
  // Navigation
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  // Formulaire d'authentification
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Formulaire OTP
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [registerdEmail, setRegisteredEmail] = useState("");
  const [timer, setTimer] = useState(60);

  // Messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -------------------------
  // 2. EFFETS (USEEFFECT)
  // -------------------------
  useEffect(() => {
    let interval;
    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  // -------------------------
  // 3. FONCTIONS (HANDLERS)
  // -------------------------
  const toggleMode = (mode) => {
    setIsLogin(mode === "login");
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (isLogin) {
      const result = await login(data.email, data.password);
      if (result.success) {
        setSuccess("Connexion réussie");
        navigate("/dashboard");
      } else {
        setError(result.error);
      }
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, data);
      
      // Inscription réussie : on passe à l'OTP
      setSuccess(response.data.message);
      setRegisteredEmail(data.email);
      setShowOtp(true);
      setTimer(60);
      setData({ name: "", email: "", password: "" });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Une erreur s'est produite");
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const codeSaisi = otp.join("");
    if (codeSaisi.length !== 6) {
      setError("Veuillez saisir les 6 chiffres.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        {
          email: registerdEmail,
          otpCode: codeSaisi,
        },
      );

      setSuccess(
        "Compte vérifié avec succès ! Vous pouvez maintenant vous connecter.",
      );
      setTimeout(() => {
        setShowOtp(false);
        setIsLogin(true);
        setSuccess("");
        setOtp(new Array(6).fill("")); // Nettoie les cases OTP
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Une erreur s'est produite");
    }
  };

  const handleResendOtp = async () => {
    try {
      setTimer(60);
      setSuccess("Envoi du nouveau code...");

      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-otp`, {
        email: registerdEmail,
      });

      setSuccess("Un nouveau code a été envoyé à votre email.");
    } catch (error) {
      setError("Impossible de renvoyer le code.");
    }
  };

  // -------------------------
  // 4. RENDUS (JSX)
  // -------------------------

  // Vue: Mot de passe oublié
  if (showForgotPassword) {
    return (
      <div className="auth-container">
        <div
          className="auth-card"
          style={{ maxWidth: "520px", minHeight: "auto" }}
        >
          <div className="auth-form-wrapper" style={{ padding: "3rem" }}>
            <button
              onClick={() => setShowForgotPassword(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#0284c7",
                fontWeight: "600",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "24px",
                padding: "0",
              }}
            >
              ← Retour à la connexion
            </button>
            <ForgotPassword />
          </div>
        </div>
      </div>
    );
  }

  // Vue: Vérification OTP
  if (showOtp) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc] w-full absolute top-0 left-0 z-50">
        <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-[450px] flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#7ba0b5] rounded-xl flex items-center justify-center text-white font-bold text-xl">
              +
            </div>
            <h1 className="text-2xl font-medium text-slate-500">
              MedPrecision
            </h1>
          </div>

          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            Vérification de sécurité
          </h2>
          <p className="text-slate-400 text-center mb-10 text-[15px] px-2 leading-relaxed">
            Veuillez saisir le code à 6 chiffres envoyé à votre adresse email.
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mb-4 text-center">{success}</p>
          )}

          <form
            onSubmit={handleVerifyOtp}
            className="w-full flex flex-col items-center"
          >
            <div className="flex justify-between w-full mb-10 gap-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-14 h-16 bg-slate-50 border-none rounded-xl text-center text-2xl font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#7ba0b5] focus:outline-none transition-all shadow-sm"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#7ba0b5] hover:bg-[#698a9d] text-white font-medium py-4 rounded-full transition-colors flex justify-center items-center gap-2 mb-8 shadow-md cursor-pointer"
            >
              Vérifier <span className="text-xl">→</span>
            </button>
          </form>

          {timer > 0 ? (
            <p className="text-sm text-slate-400 mb-8 font-medium">
              Renvoyer le code dans 0:{timer < 10 ? `0${timer}` : timer}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-sm text-[#7ba0b5] hover:text-[#698a9d] font-semibold mb-8 underline cursor-pointer"
            >
              Renvoyer le code maintenant
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowOtp(false)}
            className="text-slate-400 hover:text-slate-600 text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>←</span> Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  // Vue par défaut: Connexion / Inscription
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-illustration">
          <img src="/clinic_auth.png" alt="Medical professional smiling" />
          <div className="auth-illustration-overlay">
            <h2>{isLogin ? "Portail Patient" : "Rejoignez la Clinique"}</h2>
            <p>
              {isLogin
                ? "Accédez à votre dossier médical, vos résultats et vos rendez-vous en toute sécurité."
                : "Créez votre compte pour simplifier votre parcours de soins."}
            </p>
          </div>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h3>{isLogin ? "Connexion" : "Inscription"}</h3>
            <p>
              {isLogin
                ? "Connectez-vous à votre espace personnel."
                : "Renseignez vos informations patient."}
            </p>
          </div>

          <div className="auth-tabs">
            <div
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => toggleMode("login")}
            >
              Se Connecter
            </div>
            <div
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => toggleMode("signup")}
            >
              Nouveau Patient
            </div>
          </div>

          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {error}
            </p>
          )}
          {success && (
            <p
              style={{
                color: "green",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {success}
            </p>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <label htmlFor="name">
                    Nom Complet (sur pièce d'identité)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="entrer votre nom complet"
                    required
                    onChange={handleChange}
                    value={data.name}
                  />
                </div>
              </>
            )}

            <div className="input-group">
              <label htmlFor="email">Adresse Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="entrer votre email"
                required
                onChange={handleChange}
                value={data.email}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="entrer votre mot de passe"
                required
                onChange={handleChange}
                value={data.password}
              />
            </div>

            {isLogin && (
              <div className="forgot-password">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: "#0284c7",
                    fontWeight: "600",
                    padding: "0",
                    textDecoration: "none",
                  }}
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <button type="submit" className="auth-button">
              {isLogin ? "Accéder à mon dossier" : "Créer mon dossier"}
            </button>
          </form>

          <p className="medical-disclaimer">
            Vos données de santé sont strictement confidentielles et protégées
            selon les normes HDS (Hébergement de Données de Santé) et le RGPD.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
