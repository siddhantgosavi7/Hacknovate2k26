import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coinPopup, setCoinPopup] = useState(null);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return null;
    }
    try {
      const res = await api.get('/auth/me');
      setUser(res.data.data.user);
      return res.data.data.user;
    } catch {
      localStorage.removeItem('token');
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.data.token);
    setUser(res.data.data.user);
    return res.data.data.user;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', res.data.data.token);
    setUser(res.data.data.user);
    const bonus = res.data.data.welcomeBonus;
    if (bonus) {
      showCoinPopup(bonus, 'Welcome bonus — start shopping!');
    }
    return res.data.data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const showCoinPopup = useCallback((amount, message) => {
    setCoinPopup({ amount, message, id: Date.now() });
  }, []);

  const dismissCoinPopup = useCallback(() => {
    setCoinPopup(null);
  }, []);

  const earnEcoCoins = useCallback(
    async (action, fallbackMessage) => {
      const token = localStorage.getItem('token');
      if (!token) return null;
      try {
        const res = await api.post('/ecocoins/earn', { action });
        const { earned, label, balance } = res.data.data;
        setUser((prev) => (prev ? { ...prev, ecoCoins: balance } : prev));
        showCoinPopup(earned, fallbackMessage || label);
        return res.data.data;
      } catch (err) {
        console.error('Earn coins failed', err);
        return null;
      }
    },
    [showCoinPopup],
  );

  const updateEcoCoins = useCallback((balance) => {
    setUser((prev) => (prev ? { ...prev, ecoCoins: balance } : prev));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshUser,
      earnEcoCoins,
      updateEcoCoins,
      coinPopup,
      showCoinPopup,
      dismissCoinPopup,
    }),
    [user, loading, refreshUser, earnEcoCoins, updateEcoCoins, coinPopup, showCoinPopup, dismissCoinPopup],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
