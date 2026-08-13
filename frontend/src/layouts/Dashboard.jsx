import React, { useContext } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import AuthContext from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  // Si l'utilisateur n'est pas encore chargé depuis l'API, on affiche un chargement
  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  // Si c'est un admin, on affiche le Dashboard complet
  if (user.role === "admin") {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Bienvenue, {user.name} ! ({user.role})
          </h1>
        </div>
      </div>
    );
  }

  // Pour les autres rôles (patient, medecin, etc.) pour l'instant
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Bienvenue, {user.name} ! (Rôle : {user.role})
        </h1>
        <p>Votre tableau de bord spécifique est en cours de construction.</p>
      </div>
    </div>
  );
}

export default Dashboard;
