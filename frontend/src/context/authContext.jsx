import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react';

// Create the user context
const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null); // Handle invalid token response
          }
        } else {
          setUser(null); // No token found
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) { 
          // Unauthorized or invalid token
          setUser(null);
        }
      } finally {
        setLoading(false); // Ensure loading is set to false after try/catch
      }
    };

    verifyUser();
  }, []); 

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children} {/* Render children only after loading is false */}
    </userContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(userContext);

export default AuthContext;
