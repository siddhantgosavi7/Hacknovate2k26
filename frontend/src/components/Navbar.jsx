import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Leaf, LogIn, LogOut, Menu, Moon, ShoppingBag, Store, Sun, User, X } from 'lucide-react';
import { navItems } from '../data/mockData.js';
import LanguageSelector from './LanguageSelector.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { useTranslation } from '../contexts/TranslationContext.jsx';

export default function Navbar({
  darkMode,
  setDarkMode,
  isMarketplace,
  isProfile,
  activeSection: externalActive,
  setActiveSection: setExternalActive,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [internalActive, setInternalActive] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { totals, setIsOpen } = useCart();
  const isHome = location.pathname === '/';
  const activeSection = externalActive ?? internalActive;
  const setActiveSection = setExternalActive ?? setInternalActive;

  useEffect(() => {
    if (!isHome) return undefined;
    const sectionIds = navItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.18, 0.32, 0.48], rootMargin: '-20% 0px -55% 0px' },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, setActiveSection]);

  const goTo = (id) => {
    setOpen(false);
    if (!isHome) {
      navigate('/');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-white/55 bg-white/72 px-3 py-3 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-ink-900/72 sm:px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-eco-500 to-blue-500 text-white shadow-glow sm:h-11 sm:w-11">
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-lg font-black leading-none text-ink-950 dark:text-white">{t('common.brand')}</span>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-eco-700 dark:text-eco-200">{t('common.tagline')}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full bg-eco-50/70 p-1 dark:bg-white/8 xl:flex">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(item.id)}
              className={`relative rounded-full px-3 py-2 text-sm font-bold transition ${
                isHome && activeSection === item.id
                  ? 'text-white'
                  : 'text-ink-800/70 hover:text-eco-800 dark:text-white/62'
              }`}
            >
              {isHome && activeSection === item.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink-950 dark:bg-eco-500" />
              )}
              <span className="relative">{t(`nav.${item.id}`)}</span>
            </button>
          ))}
          <Link
            to="/marketplace"
            className={`relative rounded-full px-3 py-2 text-sm font-bold transition ${
              isMarketplace ? 'text-white' : 'text-ink-800/70 hover:text-eco-800 dark:text-white/62'
            }`}
          >
            {isMarketplace && (
              <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink-950 dark:bg-eco-500" />
            )}
            <span className="relative flex items-center gap-1">
              <Store className="h-3.5 w-3.5" />
              {t('nav.shop')}
            </span>
          </Link>
          <Link
            to="/profile"
            className={`relative hidden rounded-full px-3 py-2 text-sm font-bold transition md:inline-flex ${
              isProfile ? 'text-white' : 'text-ink-800/70 hover:text-eco-800 dark:text-white/62'
            }`}
          >
            {isProfile && (
              <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink-950 dark:bg-eco-500" />
            )}
            <span className="relative flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {t('nav.profile')}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {isAuthenticated && user && (
            <button
              type="button"
              onClick={() => navigate('/marketplace')}
              className="hidden items-center gap-1.5 rounded-full bg-lime-100 px-3 py-2 text-sm font-black text-eco-900 transition hover:bg-lime-200 dark:bg-lime-300/15 dark:text-lime-200 sm:flex"
            >
              <Coins className="h-4 w-4" />
              {user.ecoCoins}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-eco-900/10 bg-white/70 dark:border-white/10 dark:bg-white/8 sm:h-11 sm:w-11"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totals.count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-eco-600 text-[10px] font-black text-white">
                {totals.count}
              </span>
            )}
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <LanguageSelector className="hidden lg:flex" />
            <button
              type="button"
              onClick={() => setDarkMode((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-eco-900/10 bg-white/70 dark:border-white/10 dark:bg-white/8 sm:h-11 sm:w-11"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="hidden items-center gap-2 rounded-full bg-ink-950 px-4 py-2.5 text-sm font-black text-white dark:bg-eco-600 sm:flex"
            >
              <LogOut className="h-4 w-4" />
              {t('common.signOut')}
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-full bg-ink-950 px-4 py-2.5 text-sm font-black text-white dark:bg-eco-600 sm:flex"
            >
              <LogIn className="h-4 w-4" />
              {t('common.signIn')}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-ink-950 text-white xl:hidden sm:h-11 sm:w-11"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink-950/50 p-4 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ml-auto flex h-full max-w-sm flex-col rounded-[2rem] bg-white p-5 shadow-2xl dark:bg-ink-900"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <motion.div className="flex items-center gap-3 font-black">
                  <Leaf className="h-6 w-6 text-eco-600" />
                  EcoSort AI
                </motion.div>
                <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-eco-50">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {user && (
                <div className="mb-4 flex items-center gap-3 rounded-2xl bg-lime-50 p-4 dark:bg-lime-300/10">
                  <User className="h-5 w-5 text-eco-700" />
                  <div>
                    <p className="font-black">{user.name}</p>
                    <p className="flex items-center gap-1 text-sm font-bold text-eco-700">
                      <Coins className="h-3.5 w-3.5" />
                      {user.ecoCoins} EcoCoins
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 overflow-y-auto">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(item.id)}
                    className={`rounded-2xl px-4 py-3 text-left font-bold ${
                      isHome && activeSection === item.id
                        ? 'bg-eco-600 text-white'
                        : 'bg-eco-50 dark:bg-white/8'
                    }`}
                  >
                    {t(`nav.${item.id}`)}
                  </button>
                ))}
                <Link
                  to="/marketplace"
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 font-bold ${
                    isMarketplace ? 'bg-eco-600 text-white' : 'bg-eco-50 dark:bg-white/8'
                  }`}
                >
                  {t('nav.ecoMarketplace')}
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 font-bold ${
                    isProfile ? 'bg-eco-600 text-white' : 'bg-eco-50 dark:bg-white/8'
                  }`}
                >
                  {t('nav.profile')}
                </Link>
                <div className="mt-2 px-1">
                  <LanguageSelector className="w-full" />
                </div>
              </div>

              <div className="mt-auto space-y-2 pt-6">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => { logout(); setOpen(false); }}
                    className="w-full rounded-2xl bg-ink-950 py-3 font-black text-white"
                  >
                    {t('common.signOut')}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-2xl bg-eco-600 py-3 text-center font-black text-white"
                  >
                    {t('common.signIn')}
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
