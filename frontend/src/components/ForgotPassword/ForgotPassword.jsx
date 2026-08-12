import React, { useState } from 'react';
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, { email });

      if (response.data.success) {
        setIsSuccess(true);
        setMessage('Un lien de réinitialisation a été envoyé à votre adresse email.');
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      if (error.response) {
        setMessage(error.response.data.message || 'Une erreur est survenue.');
      } else {
        setMessage('Erreur de connexion au serveur.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Icon */}
      <div style={styles.iconWrapper}>
        <span style={{ fontSize: '28px' }}>📧</span>
      </div>

      <h2 style={styles.title}>Mot de passe oublié ?</h2>
      <p style={styles.subtitle}>
        Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
      </p>

      {/* Message */}
      {message && (
        <div style={{ ...styles.alert, ...(isError ? styles.alertError : styles.alertSuccess) }}>
          {isError ? '⚠️' : '✅'} {message}
        </div>
      )}

      {isSuccess ? (
        <div style={styles.successBlock}>
          <p style={styles.successHint}>
            📬 Vérifiez votre boîte mail (et vos spams). Le lien expire dans <strong>1 heure</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>✉️</span>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ ...styles.submitBtn, opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? '⏳ Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
          </button>
        </form>
      )}
    </div>
  );
}

const styles = {
  iconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '24px',
    lineHeight: '1.6',
  },
  alert: {
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: '1.5',
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
    gap: '16px',
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
  },
  input: {
    width: '100%',
    padding: '13px 16px 13px 42px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#0f172a',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  submitBtn: {
    padding: '14px',
    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
  },
  successBlock: {
    marginTop: '8px',
  },
  successHint: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.7',
    backgroundColor: '#f8fafc',
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },
};