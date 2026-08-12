import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Bienvenue, {user?.name || "Patient"} !
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;
