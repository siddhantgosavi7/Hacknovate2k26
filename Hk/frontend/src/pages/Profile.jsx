import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Coins,
  Flame,
  Gauge,
  Leaf,
  LogOut,
  Mail,
  ShoppingBag,
  Star,
  User,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { GlassCard, IconBadge, PillButton } from '../components/UI.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTranslation } from '../contexts/TranslationContext.jsx';

export default function Profile() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center px-4 py-24">
        <p className="font-black text-ink-800/50 dark:text-white/50">{t('common.loading')}</p>
      </section>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <section className="px-4 py-24">
        <div className="mx-auto max-w-lg text-center">
          <IconBadge icon={User} className="mx-auto" />
          <h1 className="mt-6 text-3xl font-black">{t('profile.title')}</h1>
          <p className="mt-3 font-bold text-ink-800/55 dark:text-white/55">{t('profile.notSignedIn')}</p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/login">
              <PillButton className="w-full px-8 py-4 sm:w-auto">{t('profile.signInBtn')}</PillButton>
            </Link>
            <Link to="/register">
              <PillButton variant="secondary" className="w-full px-8 py-4 sm:w-auto">
                {t('profile.createAccount')}
              </PillButton>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  const stats = [
    { label: t('profile.ecoCoins'), value: user.ecoCoins ?? 0, icon: Coins, color: 'from-lime-300 to-eco-600' },
    { label: t('profile.ecoScore'), value: user.ecoScore ?? 0, icon: Gauge, color: 'from-eco-500 to-teal-400' },
    { label: t('profile.rewardPoints'), value: (user.rewardPoints ?? 0).toLocaleString(), icon: Star, color: 'from-amber-400 to-orange-400' },
    { label: t('profile.streak'), value: `${user.streak ?? 0} ${t('common.days')}`, icon: Flame, color: 'from-orange-500 to-rose-400' },
  ];

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t('profile.eyebrow')} title={t('profile.title')} text={t('profile.text')} />

        <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          <GlassCard className="relative overflow-hidden bg-gradient-to-br from-ink-950 via-eco-900 to-eco-600 text-white">
            <div className="relative">
              <span className="grid h-20 w-20 place-items-center rounded-[2rem] bg-white/12 text-4xl font-black">
                {user.name?.charAt(0)?.toUpperCase() ?? 'E'}
              </span>
              <h2 className="mt-6 text-4xl font-black">{user.name}</h2>
              <p className="mt-2 flex items-center gap-2 font-bold text-white/68">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold text-white/45">
                <Calendar className="h-4 w-4" />
                {t('profile.memberSince')} • EcoSort AI
              </p>
              <p className="mt-6 text-sm leading-7 text-white/55">{t('profile.editHint')}</p>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black transition hover:bg-white/18"
              >
                <LogOut className="h-4 w-4" />
                {t('common.signOut')}
              </button>
            </div>
          </GlassCard>

          <div className="grid gap-5 sm:grid-cols-2">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <GlassCard key={stat.label}>
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${stat.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-3xl font-black">{stat.value}</p>
                  <p className="mt-1 text-sm font-bold text-ink-800/55 dark:text-white/55">{stat.label}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>

        <GlassCard className="mt-5">
          <h3 className="text-xl font-black">{t('profile.stats')}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-eco-50 p-4 dark:bg-white/8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-800/45 dark:text-white/40">
                {t('profile.name')}
              </p>
              <p className="mt-2 font-black">{user.name}</p>
            </div>
            <div className="rounded-2xl bg-eco-50 p-4 dark:bg-white/8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-800/45 dark:text-white/40">
                {t('profile.email')}
              </p>
              <p className="mt-2 font-black">{user.email}</p>
            </div>
            <div className="rounded-2xl bg-eco-50 p-4 dark:bg-white/8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-800/45 dark:text-white/40">
                {t('profile.ecoCoins')}
              </p>
              <p className="mt-2 flex items-center gap-2 font-black text-eco-700 dark:text-eco-300">
                <Coins className="h-5 w-5" />
                {user.ecoCoins ?? 0}
              </p>
            </div>
            <div className="rounded-2xl bg-eco-50 p-4 dark:bg-white/8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-800/45 dark:text-white/40">
                {t('profile.ecoScore')}
              </p>
              <p className="mt-2 font-black">{user.ecoScore ?? 0}</p>
            </div>
          </div>
        </GlassCard>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Link to="/marketplace">
            <PillButton className="w-full py-4">
              <ShoppingBag className="h-5 w-5" />
              {t('profile.goMarketplace')}
            </PillButton>
          </Link>
          <PillButton
            variant="secondary"
            className="w-full py-4"
            onClick={() => {
              navigate('/');
              window.setTimeout(() => document.getElementById('pickup')?.scrollIntoView({ behavior: 'smooth' }), 150);
            }}
          >
            <Leaf className="h-5 w-5" />
            {t('profile.schedulePickup')}
          </PillButton>
          <PillButton
            variant="secondary"
            className="w-full py-4"
            onClick={() => {
              navigate('/');
              window.setTimeout(() => document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' }), 150);
            }}
          >
            {t('profile.scanWaste')}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
