import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Load user from token on app mount
    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    // First, we can optionally check if token is valid via jwtDecode, 
                    // but calling /me is enough.
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.data.success) {
                        setUser(response.data.user);
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            }
        };
        fetchUser();
    }, [token]);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email,
                password,
            });
            
            const { token: newToken, user: newUser } = response.data;
            
            localStorage.setItem("token", newToken);
            setToken(newToken);
            setUser(newUser);
            
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Login failed",
            };
        }
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                name,
                email,
                password,
            });
            
            const { token: newToken, user: newUser } = response.data;
            
            localStorage.setItem("token", newToken);
            setToken(newToken);
            setUser(newUser);
            
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Registration failed",
            };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return token !== null && user !== null;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
