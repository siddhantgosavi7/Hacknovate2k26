import { useState, useEffect } from 'react';
import { Award, Flame, Gauge, Leaf, Star, Trophy } from 'lucide-react';
import api from '../api.js';
import { useTranslation } from '../contexts/TranslationContext.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { GlassCard, IconBadge, ProgressBar } from '../components/UI.jsx';
import { achievements, leaderboard as mockLeaderboard } from '../data/mockData.js';

export default function Rewards() {
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lbRes, meRes] = await Promise.all([
          api.get('/leaderboard'),
          api.get('/auth/me')
        ]);
        if (lbRes.data?.data?.leaderboard) setLeaderboard(lbRes.data.data.leaderboard);
        if (meRes.data?.data?.user) setUser(meRes.data.data.user);
      } catch (err) {
        console.error('Failed to fetch rewards/leaderboard:', err);
      }
    };
    fetchData();
  }, []);

  const ecoScore = user?.ecoScore ?? 894;
  const rewardPoints = user?.rewardPoints ?? 12840;

  return (
    <section id="rewards" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={t('rewards.eyebrow')}
          title={t('rewards.title')}
          text={t('rewards.text')}
        />

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <GlassCard className="relative overflow-hidden bg-gradient-to-br from-ink-950 to-eco-800 text-white dark:from-eco-950 dark:to-ink-950">
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-eco-100">{t('rewards.yourEcoScore')}</p>
                  <p className="mt-4 text-7xl font-black">
                    <AnimatedCounter value={ecoScore} />
                  </p>
                </div>
                <div className="grid h-24 w-24 place-items-center rounded-[2rem] bg-white/12">
                  <Gauge className="h-12 w-12" />
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: t('rewards.xpPoints'), value: rewardPoints.toLocaleString(), icon: Star },
                  { label: t('rewards.streak'), value: `${user?.streak ?? 31} ${t('common.days')}`, icon: Flame },
                  { label: t('rewards.rank'), value: '#12', icon: Trophy },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-[1.5rem] bg-white/12 p-4">
                      <Icon className="h-5 w-5 text-eco-200" />
                      <p className="mt-4 text-2xl font-black">{item.value}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/58">{item.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 space-y-5">
                <ProgressBar value={78} label={t('rewards.levelProgress')} color="from-lime-300 to-eco-400" />
                <ProgressBar value={64} label={t('rewards.monthlyTarget')} color="from-blue-400 to-cyan-300" />
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-5 sm:grid-cols-2">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <GlassCard key={achievement.title} className="group">
                  <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${achievement.color} text-white shadow-lg transition group-hover:scale-105`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-ink-950 dark:text-white">{achievement.title}</h3>
                  <p className="mt-2 text-sm font-bold text-ink-800/58 dark:text-white/52">{achievement.value}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-eco-700 dark:text-eco-200">Top recyclers</p>
                <h3 className="mt-2 text-2xl font-black text-ink-950 dark:text-white">City leaderboard</h3>
              </div>
              <IconBadge icon={Trophy} />
            </div>
            <div className="space-y-3">
              {leaderboard.map((person, index) => (
                <div key={person.name} className="flex items-center gap-4 rounded-[1.4rem] bg-eco-50 p-4 dark:bg-white/8">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-ink-950 text-sm font-black text-white dark:bg-eco-500">#{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-black text-ink-950 dark:text-white">{person.name}</p>
                    <p className="text-sm font-bold text-ink-800/54 dark:text-white/48">{person.area} • {person.streak} day streak</p>
                  </div>
                  <p className="text-lg font-black text-eco-700 dark:text-eco-200">{person.points.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-eco-700 dark:text-eco-200">Monthly impact</p>
                <h3 className="mt-2 text-2xl font-black text-ink-950 dark:text-white">Your footprint</h3>
              </div>
              <IconBadge icon={Leaf} />
            </div>
            <div className="mt-7 grid gap-4">
              {[
                ['Waste diverted', '82 kg', 82],
                ['CO2 saved', '124 kg', 72],
                ['Water saved', '940 L', 67],
                ['Pickup accuracy', '96%', 96],
              ].map(([label, value, progress]) => (
                <div key={label} className="rounded-[1.4rem] bg-white/55 p-4 dark:bg-white/6">
                  <div className="mb-3 flex items-center justify-between font-black">
                    <span>{label}</span>
                    <span className="text-eco-700 dark:text-eco-200">{value}</span>
                  </div>
                  <ProgressBar value={progress} label="" />
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[1.5rem] bg-gradient-to-r from-eco-600 to-blue-600 p-5 text-white">
              <Award className="h-6 w-6" />
              <p className="mt-3 text-xl font-black">Next badge unlocks at 900 EcoScore.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
