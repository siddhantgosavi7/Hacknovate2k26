import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Lock, Mail, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTranslation } from '../contexts/TranslationContext.jsx';
import LanguageSelector from '../components/LanguageSelector.jsx';
import { GlassCard, PillButton } from '../components/UI.jsx';

export default function Login() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || t('auth.loginFailed'));
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
          <motion.div className="mb-4 flex justify-end">
            <LanguageSelector />
          </motion.div>
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-eco-100 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-eco-700 dark:bg-eco-500/20 dark:text-eco-200">
              <Sparkles className="h-3.5 w-3.5" />
              {t('auth.welcomeBack')}
            </span>
            <h1 className="mt-4 text-3xl font-black">{t('auth.signInTitle')}</h1>
            <p className="mt-2 text-sm font-bold text-ink-800/55 dark:text-white/55">{t('auth.signInSubtitle')}</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
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
                placeholder="you@example.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-eco-900/10 bg-eco-50 px-4 py-3 font-bold outline-none focus:ring-4 focus:ring-eco-500/15 dark:border-white/10 dark:bg-white/8"
              />
            </label>

            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 dark:bg-red-500/15 dark:text-red-300">
                {error}
              </p>
            )}

            <PillButton type="submit" className="w-full py-4" disabled={loading}>
              {loading ? t('auth.signingIn') : t('auth.signInTitle')}
            </PillButton>
          </form>

          <p className="mt-6 text-center text-sm font-bold text-ink-800/55 dark:text-white/55">
            {t('auth.newHere')}{' '}
            <Link to="/register" className="text-eco-700 underline-offset-2 hover:underline dark:text-eco-300">
              {t('auth.createAccount')}
            </Link>
          </p>

          <p className="mt-4 rounded-2xl bg-eco-50/80 p-3 text-center text-xs font-bold text-ink-800/45 dark:bg-white/6 dark:text-white/45">
            {t('common.demo')}
          </p>
        </GlassCard>
      </div>
    </motion.div>
  );
}
