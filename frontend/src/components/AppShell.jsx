import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import EcoCoinPopup from './EcoCoinPopup.jsx';
import CartDrawer from './CartDrawer.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import Navbar from './Navbar.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function AppShell() {
  const [darkMode, setDarkMode] = useState(false);
  const { coinPopup, dismissCoinPopup } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isMarketplace = location.pathname === '/marketplace';
  const isProfile = location.pathname === '/profile';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen overflow-hidden text-ink-950 dark:text-white">
      {!isAuthPage && (
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} isMarketplace={isMarketplace} isProfile={isProfile} />
      )}
      {isAuthPage && (
        <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
          <LanguageSelector />
          <button
            type="button"
            onClick={() => setDarkMode((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-eco-900/10 bg-white/70 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/72"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      )}
      <Outlet context={{ darkMode }} />
      <CartDrawer />
      <EcoCoinPopup popup={coinPopup} onDismiss={dismissCoinPopup} />
    </div>
  );
}
