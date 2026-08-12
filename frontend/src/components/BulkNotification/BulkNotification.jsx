import React, { useState } from 'react';
import axios from 'axios';

export default function BulkNotification() {
  const [title, setTitle] = useState('');
  const [messageText, setMessageText] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('Envoi en cours...');
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/bulk-notification`, { 
        title, 
        message: messageText 
      }, {
        
        // Décommentez ceci si votre route nécessite un token d'administrateur
        // headers: {
        //   'Authorization': `Bearer ${localStorage.getItem('token')}`
        // }
      });
      
      if (response.data.success) {
        setStatus('Notifications envoyées avec succès à tous les patients !');
        setTitle('');
        setMessageText('');
      }
    } catch (error) {
      if (error.response) {
        setStatus(error.response.data.message || 'Erreur lors de l\'envoi');
      } else {
        setStatus('Erreur de connexion au serveur');
      }
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow border border-red-200">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Envoyer une alerte à tous les patients</h2>
      {status && <p className="mb-4 font-bold text-red-500">{status}</p>}
      
      <form onSubmit={handleSend} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Sujet de l'email (ex: Fermeture de la clinique)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required 
        />
        <textarea 
          placeholder="Contenu du message..." 
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="border border-gray-300 p-2 rounded h-32 resize-none"
          required 
        />
        <button type="submit" className="bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition">
          Envoyer la notification générale
        </button>
      </form>
    </div>
  );
}
