import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coins, Leaf, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTranslation } from '../contexts/TranslationContext.jsx';
import LanguageSelector from '../components/LanguageSelector.jsx';
import { GlassCard, PillButton } from '../components/UI.jsx';

export default function Register() {
  const { register } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/marketplace');
    } catch (err) {
      setError(err.response?.data?.error || t('auth.registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center px-4 py-24"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-eco-500 to-blue-500 text-white shadow-glow">
            <Leaf className="h-6 w-6" />
          </span>
          <span className="text-2xl font-black">{t('common.brand')}</span>
        </Link>

        <GlassCard className="!p-8">
          <div className="mb-4 flex justify-end">
            <LanguageSelector />
          </div>
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-lime-100 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-eco-800 dark:bg-lime-300/15 dark:text-lime-200">
              <Coins className="h-3.5 w-3.5" />
              {t('auth.welcomeBonus')}
            </span>
            <h1 className="mt-4 text-3xl font-black">{t('auth.registerTitle')}</h1>
            <p className="mt-2 text-sm font-bold text-ink-800/55 dark:text-white/55">{t('auth.registerSubtitle')}</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-black">
                <User className="h-4 w-4 text-eco-600" />
                {t('auth.fullName')}
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-eco-900/10 bg-eco-50 px-4 py-3 font-bold outline-none focus:ring-4 focus:ring-eco-500/15 dark:border-white/10 dark:bg-white/8"
              />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-black">
                <Mail className="h-4 w-4 text-eco-600" />
                {t('auth.email')}
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-eco-900/10 bg-eco-50 px-4 py-3 font-bold outline-none focus:ring-4 focus:ring-eco-500/15 dark:border-white/10 dark:bg-white/8"
              />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-black">
                <Lock className="h-4 w-4 text-eco-600" />
                {t('auth.password')}
              </span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.minPassword')}
                className="w-full rounded-2xl border border-eco-900/10 bg-eco-50 px-4 py-3 font-bold outline-none focus:ring-4 focus:ring-eco-500/15 dark:border-white/10 dark:bg-white/8"
              />
            </label>

            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 dark:bg-red-500/15 dark:text-red-300">
                {error}
              </p>
            )}

            <PillButton type="submit" className="w-full py-4" disabled={loading}>
              {loading ? t('auth.creating') : t('auth.signUp')}
            </PillButton>
          </form>

          <p className="mt-6 text-center text-sm font-bold text-ink-800/55 dark:text-white/55">
            {t('auth.haveAccount')}{' '}
            <Link to="/login" className="text-eco-700 underline-offset-2 hover:underline dark:text-eco-300">
              {t('auth.signInTitle')}
            </Link>
          </p>
        </GlassCard>
      </div>
    </motion.div>
  );
}
