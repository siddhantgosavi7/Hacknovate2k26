import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Clock, Coins, Home, PackageCheck, Sparkles } from 'lucide-react';
import api from '../api.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTranslation } from '../contexts/TranslationContext.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { GlassCard, IconBadge, PillButton } from '../components/UI.jsx';

const WASTE_CATEGORIES = [
  { value: 'Dry Waste', key: 'pickup.dryWaste' },
  { value: 'Wet Waste', key: 'pickup.wetWaste' },
  { value: 'E-Waste', key: 'pickup.ewasteCat' },
  { value: 'Hazardous Waste', key: 'pickup.hazardousCat' },
  { value: 'Bulk Recycling', key: 'pickup.bulk' },
];

export default function PickupScheduling({ onToast }) {
  const { isAuthenticated, showCoinPopup, updateEcoCoins } = useAuth();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    date: '2026-05-18',
    time: '09:00',
    category: 'Dry Waste',
    address: 'Green Heights Society, Block B, Pune',
  });
  const [confirmed, setConfirmed] = useState(false);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      onToast(t('pickup.toastSignIn'), t('pickup.toastSignInText'));
      return;
    }
    try {
      const res = await api.post('/pickups', {
        scheduledDate: form.date,
        scheduledTime: form.time,
        category: form.category,
        address: form.address,
      });
      setConfirmed(true);
      const earned = res.data.data.ecoCoinsEarned;
      const balance = res.data.data.ecoCoinsBalance;
      updateEcoCoins(balance);
      showCoinPopup(earned, t('pickup.coinsEarned'));
      onToast(t('pickup.toastScheduled'), `${FORM_CATEGORY_LABEL} — ${form.date} ${form.time}`);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.status === 401 ? t('pickup.toastAuth') : t('pickup.toastFailed');
      onToast(t('pickup.toastError'), msg);
    }
  };

  const FORM_CATEGORY_LABEL =
    t(WASTE_CATEGORIES.find((c) => c.value === form.category)?.key || 'pickup.dryWaste');

  const summaryRows = [
    { label: t('pickup.category'), value: FORM_CATEGORY_LABEL },
    { label: t('pickup.slot'), value: `${form.date} at ${form.time}` },
    { label: t('pickup.address'), value: form.address },
  ];

  return (
    <section id="pickup" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t('pickup.eyebrow')} title={t('pickup.title')} text={t('pickup.text')} />

        {!isAuthenticated && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-lime-300/40 bg-lime-50/80 px-5 py-4 dark:bg-lime-300/10">
            <p className="flex items-center gap-2 font-bold text-eco-900 dark:text-lime-200">
              <Coins className="h-5 w-5" />
              {t('pickup.signInBanner')}
            </p>
            <Link to="/login" className="rounded-full bg-eco-600 px-5 py-2 text-sm font-black text-white">
              {t('common.signIn')}
            </Link>
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassCard>
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-ink-900 dark:text-white">
                    <CalendarCheck className="h-4 w-4 text-eco-600" />
                    {t('pickup.date')}
                  </span>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) => updateForm('date', event.target.value)}
                    className="w-full rounded-2xl border border-eco-900/10 bg-eco-50 px-4 py-3 font-bold outline-none focus:ring-4 focus:ring-eco-500/15 dark:border-white/10 dark:bg-white/8"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-ink-900 dark:text-white">
                    <Clock className="h-4 w-4 text-eco-600" />
                    {t('pickup.time')}
                  </span>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(event) => updateForm('time', event.target.value)}
                    className="w-full rounded-2xl border border-eco-900/10 bg-eco-50 px-4 py-3 font-bold outline-none focus:ring-4 focus:ring-eco-500/15 dark:border-white/10 dark:bg-white/8"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-black text-ink-900 dark:text-white">
                  <PackageCheck className="h-4 w-4 text-eco-600" />
                  {t('pickup.category')}
                </span>
                <select
                  value={form.category}
                  onChange={(event) => updateForm('category', event.target.value)}
                  className="w-full rounded-2xl border border-eco-900/10 bg-eco-50 px-4 py-3 font-bold outline-none focus:ring-4 focus:ring-eco-500/15 dark:border-white/10 dark:bg-white/8"
                >
                  {WASTE_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {t(cat.key)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-black text-ink-900 dark:text-white">
                  <Home className="h-4 w-4 text-eco-600" />
                  {t('pickup.address')}
                </span>
                <textarea
                  value={form.address}
                  onChange={(event) => updateForm('address', event.target.value)}
                  rows="4"
                  className="w-full resize-none rounded-2xl border border-eco-900/10 bg-eco-50 px-4 py-3 font-bold outline-none focus:ring-4 focus:ring-eco-500/15 dark:border-white/10 dark:bg-white/8"
                />
              </label>
              <PillButton className="w-full py-4">
                <CalendarCheck className="h-5 w-5" />
                {t('pickup.schedule')}
              </PillButton>
            </form>
          </GlassCard>

          <GlassCard className="relative overflow-hidden bg-gradient-to-br from-ink-950 via-eco-900 to-eco-600 text-white">
            <div className="relative">
              <IconBadge icon={Sparkles} className="bg-white/12 text-white" />
              <h3 className="mt-6 text-4xl font-black">{t('pickup.confirmation')}</h3>
              <p className="mt-4 max-w-xl leading-8 text-white/68">{t('pickup.confirmationText')}</p>
              <div className="mt-8 grid gap-4">
                {summaryRows.map((row) => (
                  <div key={row.label} className="rounded-[1.5rem] bg-white/12 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">{row.label}</p>
                    <p className="mt-2 font-black">{row.value}</p>
                  </div>
                ))}
              </div>
              {confirmed && (
                <div className="mt-6 rounded-[1.5rem] border border-lime-200/30 bg-lime-300/16 p-5">
                  <p className="text-xl font-black">{t('pickup.confirmed')}</p>
                  <p className="mt-2 text-sm font-bold text-white/68">{t('pickup.reminder')}</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
