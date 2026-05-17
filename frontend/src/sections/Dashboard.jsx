import { Activity, Brain, MapPinned, Route, Siren, TrendingUp } from 'lucide-react';
import { BarChart, DonutChart, LineChart } from '../components/Charts.jsx';
import { useTranslation } from '../contexts/TranslationContext.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { GlassCard, IconBadge, ProgressBar } from '../components/UI.jsx';
import { activityFeed, areaStats, categoryDistribution, heatmapCards, participationTrend, pickupRequests } from '../data/mockData.js';

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <section id="dashboard" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={t('dashboard.eyebrow')}
          title={t('dashboard.title')}
          text={t('dashboard.text')}
        />

        <div className="grid gap-5 lg:grid-cols-[17rem_1fr]">
          <aside className="glass top-28 h-max rounded-[2rem] p-4 lg:sticky">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-ink-950 to-eco-700 p-5 text-white">
              <Brain className="h-8 w-8 text-eco-200" />
              <p className="mt-4 text-lg font-black">{t('dashboard.opsTitle')}</p>
              <p className="mt-2 text-sm leading-6 text-white/62">{t('dashboard.opsText')}</p>
            </div>
            <div className="mt-4 space-y-2">
              {[
                [t('dashboard.overview'), TrendingUp],
                [t('dashboard.pickupRoutes'), Route],
                [t('dashboard.hotspots'), MapPinned],
                [t('dashboard.alerts'), Siren],
              ].map(([label, Icon]) => (
                <button
                  key={label}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black text-ink-800/66 transition hover:bg-eco-50 dark:text-white/58 dark:hover:bg-white/8"
                >
                  <Icon className="h-5 w-5 text-eco-700 dark:text-eco-200" />
                  {label}
                </button>
              ))}
            </div>
          </aside>

          <div className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                [t('dashboard.pickupRequests'), '506', '+18%', Route],
                [t('dashboard.sortedWaste'), '86%', '+9%', Activity],
                [t('dashboard.riskAlerts'), '12', '-4%', Siren],
              ].map(([label, value, change, Icon]) => (
                <GlassCard key={label}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-ink-800/55 dark:text-white/50">{label}</p>
                      <p className="mt-2 text-4xl font-black text-ink-950 dark:text-white">{value}</p>
                      <p className="mt-2 text-sm font-black text-eco-700 dark:text-eco-200">{change} {t('common.thisWeek')}</p>
                    </div>
                    <IconBadge icon={Icon} />
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <GlassCard>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-black text-ink-950 dark:text-white">Waste category distribution</h3>
                </div>
                <DonutChart data={categoryDistribution} />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {categoryDistribution.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-eco-50 p-3 dark:bg-white/8">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="flex-1 text-sm font-bold">{item.label}</span>
                      <span className="text-sm font-black">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="mb-6 text-2xl font-black text-ink-950 dark:text-white">Pickup requests</h3>
                <BarChart data={pickupRequests} />
              </GlassCard>
            </div>

            <GlassCard>
              <h3 className="mb-6 text-2xl font-black text-ink-950 dark:text-white">Recycling participation trends</h3>
              <LineChart data={participationTrend} />
            </GlassCard>

            <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
              <GlassCard>
                <h3 className="text-2xl font-black text-ink-950 dark:text-white">Heatmap-style ward cards</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {heatmapCards.map((card) => (
                    <div
                      key={card.area}
                      className="rounded-[1.4rem] p-4 text-white"
                      style={{
                        background: `linear-gradient(135deg, rgba(6,44,28,0.95), rgba(31,183,103,${0.35 + card.intensity / 155}))`,
                      }}
                    >
                      <p className="text-sm font-bold text-white/68">{card.area}</p>
                      <p className="mt-4 text-3xl font-black">{card.intensity}</p>
                      <p className="mt-1 text-sm font-bold text-white/72">{card.label}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-ink-950 dark:text-white">Smart city insights</h3>
                  <IconBadge icon={Brain} />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-[1.5rem] bg-eco-50 p-5 dark:bg-white/8">
                    <p className="font-black">Optimize dry-waste pickups in Ward E</p>
                    <p className="mt-2 text-sm leading-6 text-ink-800/60 dark:text-white/55">AI predicts a 21% plastic load increase over the next 48 hours.</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-eco-50 p-5 dark:bg-white/8">
                    <p className="font-black">Run awareness nudges in Metro Ward</p>
                    <p className="mt-2 text-sm leading-6 text-ink-800/60 dark:text-white/55">Mixed-waste reports remain above the city baseline.</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <GlassCard>
                <h3 className="mb-6 text-2xl font-black text-ink-950 dark:text-white">Area-wise waste statistics</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[42rem] border-separate border-spacing-y-3 text-left">
                    <thead className="text-xs font-black uppercase tracking-[0.2em] text-ink-800/45 dark:text-white/38">
                      <tr>
                        <th className="px-4">Area</th>
                        <th className="px-4">Dry</th>
                        <th className="px-4">Wet</th>
                        <th className="px-4">E-Waste</th>
                        <th className="px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {areaStats.map((row) => (
                        <tr key={row.area} className="bg-eco-50 dark:bg-white/8">
                          <td className="rounded-l-2xl px-4 py-4 font-black">{row.area}</td>
                          <td className="px-4 py-4">{row.dry}%</td>
                          <td className="px-4 py-4">{row.wet}%</td>
                          <td className="px-4 py-4">{row.ewaste}%</td>
                          <td className="rounded-r-2xl px-4 py-4 text-sm font-bold text-eco-700 dark:text-eco-200">{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="mb-6 text-2xl font-black text-ink-950 dark:text-white">Recent recycling activity</h3>
                <div className="space-y-4">
                  {activityFeed.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.text} className="flex gap-3 rounded-[1.4rem] bg-eco-50 p-4 dark:bg-white/8">
                        <IconBadge icon={Icon} className="h-10 w-10 rounded-xl" />
                        <div>
                          <p className="font-bold leading-6">{item.text}</p>
                          <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-ink-800/42 dark:text-white/38">{item.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            <GlassCard>
              <h3 className="mb-6 text-2xl font-black text-ink-950 dark:text-white">Operational progress</h3>
              <div className="grid gap-5 md:grid-cols-3">
                <ProgressBar value={88} label="Route optimization" />
                <ProgressBar value={74} label="Citizen participation" color="from-blue-500 to-cyan-300" />
                <ProgressBar value={63} label="Contamination reduction" color="from-amber-400 to-lime-300" />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
