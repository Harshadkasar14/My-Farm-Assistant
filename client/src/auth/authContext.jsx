import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Custom hook
export const useAuth = () => useContext(AuthContext);

const API = "http://localhost:5000/api/users";

// 3. Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setAuthenticated(true);
    }
  }, []);

  async function login(email, password) {
    try {
      const res=await axios.post(`${API}/login`, { email, password });

       // ✅ Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      setAuthenticated(true);
      

      return { success: true };
    } catch (error) {
      logout()
    
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, email: user?.email }}>
      {children}
    </AuthContext.Provider>
  );
};
