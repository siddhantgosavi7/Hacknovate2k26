import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Leaf, Menu, Moon, Sun, X } from 'lucide-react';
import { navItems } from '../data/mockData.js';

export default function Navbar({ activeSection, setActiveSection, darkMode, setDarkMode, language, setLanguage }) {
  const [open, setOpen] = useState(false);

  const goTo = (id) => {
    setActiveSection(id);
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/55 bg-white/72 px-4 py-3 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-ink-900/72">
        <button type="button" onClick={() => goTo('home')} className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-eco-500 to-blue-500 text-white shadow-glow">
            <Leaf className="h-6 w-6" />
          </span>
          <span className="text-left">
            <span className="block text-lg font-black leading-none text-ink-950 dark:text-white">EcoSort AI</span>
            <span className="hidden text-xs font-bold uppercase tracking-[0.22em] text-eco-700 dark:text-eco-200 sm:block">Clean City OS</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 rounded-full bg-eco-50/70 p-1 dark:bg-white/8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(item.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-bold transition ${
                activeSection === item.id ? 'text-white' : 'text-ink-800/70 hover:text-eco-800 dark:text-white/62 dark:hover:text-white'
              }`}
            >
              {activeSection === item.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink-950 dark:bg-eco-500" />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-eco-800/10 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-white/8 sm:flex">
            <Languages className="h-4 w-4 text-eco-700 dark:text-eco-200" />
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="bg-transparent text-sm font-bold outline-none dark:text-white"
              aria-label="Select language"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-eco-900/10 bg-white/70 text-ink-950 transition hover:bg-eco-50 dark:border-white/10 dark:bg-white/8 dark:text-white"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full bg-ink-950 text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink-950/50 p-4 backdrop-blur-sm lg:hidden"
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
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3 font-black">
                  <Leaf className="h-6 w-6 text-eco-600" />
                  EcoSort AI
                </div>
                <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-eco-50 dark:hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(item.id)}
                    className={`rounded-2xl px-4 py-3 text-left font-bold ${
                      activeSection === item.id ? 'bg-eco-600 text-white' : 'bg-eco-50 text-ink-950 dark:bg-white/8 dark:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
