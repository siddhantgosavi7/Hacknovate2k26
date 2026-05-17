import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { TranslationProvider } from './contexts/TranslationContext.jsx';
import AppShell from './components/AppShell.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Marketplace from './pages/Marketplace.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <TranslationProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route element={<AppShell />}>
                <Route index element={<HomePage />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </TranslationProvider>
    </BrowserRouter>
  );
}
