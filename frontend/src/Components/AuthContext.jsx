import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Vérifier le token auprès du serveur
          const response = await fetch('http://localhost:3000/users', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            // Si le token n'est pas valide, on nettoie le localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Erreur de vérification du token:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Appel au serveur pour le logout
        await fetch('http://localhost:3000/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};