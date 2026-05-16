import { useState } from 'react';
import { CalendarCheck, Clock, Home, PackageCheck, Sparkles } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { GlassCard, IconBadge, PillButton } from '../components/UI.jsx';

export default function PickupScheduling({ onToast }) {
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

  const submit = (event) => {
    event.preventDefault();
    setConfirmed(true);
    onToast('Pickup scheduled', `${form.category} pickup confirmed for ${form.date} at ${form.time}.`);
  };

  return (
    <section id="pickup" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Pickup Scheduling"
          title="Book recycling pickups without friction."
          text="A citizen-friendly scheduling flow that captures category, address, and time while producing clear confirmation for municipal routing."
        />

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassCard>
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-ink-900 dark:text-white">
                    <CalendarCheck className="h-4 w-4 text-eco-600" />
                    Date
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
                    Time
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
                  Waste category
                </span>
                <select
                  value={form.category}
                  onChange={(event) => updateForm('category', event.target.value)}
                  className="w-full rounded-2xl border border-eco-900/10 bg-eco-50 px-4 py-3 font-bold outline-none focus:ring-4 focus:ring-eco-500/15 dark:border-white/10 dark:bg-white/8"
                >
                  <option>Dry Waste</option>
                  <option>Wet Waste</option>
                  <option>E-Waste</option>
                  <option>Hazardous Waste</option>
                  <option>Bulk Recycling</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-black text-ink-900 dark:text-white">
                  <Home className="h-4 w-4 text-eco-600" />
                  Address
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
                Schedule Recycling Pickup
              </PillButton>
            </form>
          </GlassCard>

          <GlassCard className="relative overflow-hidden bg-gradient-to-br from-ink-950 via-eco-900 to-eco-600 text-white">
            <div className="relative">
              <IconBadge icon={Sparkles} className="bg-white/12 text-white" />
              <h3 className="mt-6 text-4xl font-black">Pickup confirmation</h3>
              <p className="mt-4 max-w-xl leading-8 text-white/68">
                Smart routing will group this request with nearby pickups, reducing travel distance and improving recycling recovery.
              </p>
              <div className="mt-8 grid gap-4">
                {[
                  ['Category', form.category],
                  ['Slot', `${form.date} at ${form.time}`],
                  ['Address', form.address],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] bg-white/12 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">{label}</p>
                    <p className="mt-2 font-black">{value}</p>
                  </div>
                ))}
              </div>
              {confirmed && (
                <div className="mt-6 rounded-[1.5rem] border border-lime-200/30 bg-lime-300/16 p-5">
                  <p className="text-xl font-black">Confirmed. Route ID ECO-4821 generated.</p>
                  <p className="mt-2 text-sm font-bold text-white/68">You will receive a reminder notification before pickup.</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
