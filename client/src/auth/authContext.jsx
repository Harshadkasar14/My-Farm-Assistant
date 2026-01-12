import axios from "axios";
import { createContext, useContext, useState } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Custom hook
export const useAuth = () => useContext(AuthContext);

// 3. Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState(null);

  const API = "http://localhost:5000/api/users";

  async function login(email, password) {
    try {
      await axios.post(`${API}/login`, { email, password });

      setAuthenticated(true);
      setEmail(email);

      return { success: true };
    } catch (error) {
      setAuthenticated(false);
      setEmail(null);

      if (error.response?.status === 404) {
        return { success: false, message: "User not found. Please sign up." };
      }
      if (error.response?.status === 401) {
        return { success: false, message: "Incorrect email or password." };
      }
      return { success: false, message: "Login failed. Try again later." };
    }
  }

  function logout() {
    setAuthenticated(false);
    setEmail(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};
