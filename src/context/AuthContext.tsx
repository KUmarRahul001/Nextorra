import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getStoredUser, clearAuthToken } from '../lib/api';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verify = async () => {
      const stored = getStoredUser();
      if (!stored) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await api.verifyAuth();
        if (res.valid) {
          setUser(res.user);
        } else {
          clearAuthToken();
          setUser(null);
        }
      } catch {
        // Token was invalid or network offline
        clearAuthToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    const res = await api.login(credentials);
    if (res.success && res.user) {
      setUser(res.user);
    }
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
