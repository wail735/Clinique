import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getPasswordStrength = (pwd) => {
    if (pwd.length === 0) return { label: '', color: '#e5e7eb', width: '0%' };
    if (pwd.length < 6) return { label: 'Faible', color: '#ef4444', width: '25%' };
    if (pwd.length < 8) return { label: 'Moyen', color: '#f97316', width: '50%' };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && pwd.length >= 8)
      return { label: 'Fort', color: '#22c55e', width: '100%' };
    return { label: 'Bien', color: '#3b82f6', width: '75%' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      setIsError(true);
      return;
    }

    if (password.length < 6) {
      setMessage('Le mot de passe doit contenir au moins 6 caractères.');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${resetToken}`, {
        password,
      });

      if (response.data.success) {
        setIsSuccess(true);
        setMessage('Mot de passe modifié avec succès ! Vous pouvez vous connecter.');
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      if (error.response) {
        setMessage(error.response.data.message || 'Lien invalide ou expiré.');
      } else {
        setMessage('Erreur de connexion au serveur.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Icon */}
        <div style={styles.iconWrapper}>
          <span style={styles.icon}>🔑</span>
        </div>

        <h2 style={styles.title}>Nouveau mot de passe</h2>
        <p style={styles.subtitle}>
          Choisissez un mot de passe sécurisé pour votre compte.
        </p>

        {/* Message */}
        {message && (
          <div style={{ ...styles.alert, ...(isError ? styles.alertError : styles.alertSuccess) }}>
            <span>{isError ? '⚠️' : '✅'} {message}</span>
          </div>
        )}

        {/* Success state */}
        {isSuccess ? (
          <div style={styles.successBlock}>
            <p style={styles.successText}>Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
            <a href="/" style={styles.loginLink}>
              Retour à l'accueil
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Nouveau mot de passe */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Nouveau mot de passe</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Entrez votre nouveau mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.toggleBtn}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {/* Password strength bar */}
              {password.length > 0 && (
                <div style={styles.strengthWrapper}>
                  <div style={styles.strengthBar}>
                    <div
                      style={{
                        ...styles.strengthFill,
                        width: strength.width,
                        backgroundColor: strength.color,
                      }}
                    />
                  </div>
                  <span style={{ ...styles.strengthLabel, color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirmer le mot de passe */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Confirmer le mot de passe</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Répétez votre nouveau mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    ...styles.input,
                    borderColor:
                      confirmPassword.length > 0
                        ? confirmPassword === password
                          ? '#22c55e'
                          : '#ef4444'
                        : '#e5e7eb',
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={styles.toggleBtn}
                >
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </div>
              {confirmPassword.length > 0 && confirmPassword !== password && (
                <p style={styles.matchError}>Les mots de passe ne correspondent pas.</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{ ...styles.submitBtn, opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? (
                <span style={styles.spinner}>⏳ Enregistrement...</span>
              ) : (
                'Mettre à jour le mot de passe'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f5e9 100%)',
    padding: '24px',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
  },
  iconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  icon: {
    fontSize: '28px',
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '28px',
    lineHeight: '1.6',
  },
  alert: {
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  alertError: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
  },
  alertSuccess: {
    backgroundColor: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    fontSize: '16px',
    zIndex: 1,
  },
  input: {
    width: '100%',
    padding: '12px 44px 12px 42px',
    border: '1.5px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#1e293b',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  toggleBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
  },
  strengthWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '4px',
  },
  strengthBar: {
    flex: 1,
    height: '5px',
    backgroundColor: '#e5e7eb',
    borderRadius: '99px',
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: '99px',
    transition: 'width 0.3s, background-color 0.3s',
  },
  strengthLabel: {
    fontSize: '12px',
    fontWeight: '600',
    minWidth: '40px',
  },
  matchError: {
    fontSize: '12px',
    color: '#ef4444',
    margin: '0',
  },
  submitBtn: {
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '8px',
  },
  successBlock: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  successText: {
    color: '#16a34a',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  loginLink: {
    display: 'inline-block',
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '14px',
  },
};
