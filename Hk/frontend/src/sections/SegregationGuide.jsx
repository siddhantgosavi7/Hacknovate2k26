import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { GlassCard } from '../components/UI.jsx';
import { guideItems } from '../data/mockData.js';

export default function SegregationGuide() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(
    () => guideItems.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.bin.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <section id="guide" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Smart Segregation Guide"
          title="Every item gets a clear next step."
          text="Search common waste categories and get the right bin, recycling status, and safety instructions for responsible disposal."
        />

        <div className="mx-auto mb-8 flex max-w-2xl items-center gap-3 rounded-full border border-eco-800/12 bg-white/72 px-5 py-4 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/8">
          <Search className="h-5 w-5 text-eco-700 dark:text-eco-200" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search plastic, glass, batteries, green bin..."
            className="min-w-0 flex-1 bg-transparent font-bold outline-none placeholder:text-ink-900/38 dark:placeholder:text-white/35"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.name} delay={index * 0.05} className="group overflow-hidden">
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${item.accent} text-white shadow-lg transition group-hover:scale-105`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-ink-950 dark:text-white">{item.name}</h3>
                <div className="mt-5 space-y-3">
                  <div className="rounded-[1.25rem] bg-eco-50 p-4 dark:bg-white/8">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-800/42 dark:text-white/38">Bin to use</p>
                    <p className="mt-2 font-black text-eco-700 dark:text-eco-200">{item.bin}</p>
                  </div>
                  <div className="rounded-[1.25rem] bg-eco-50 p-4 dark:bg-white/8">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-800/42 dark:text-white/38">Recyclable</p>
                    <p className="mt-2 font-black text-ink-950 dark:text-white">{item.recyclable}</p>
                  </div>
                  <div className="rounded-[1.25rem] bg-eco-50 p-4 dark:bg-white/8">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-800/42 dark:text-white/38">Safety</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-ink-800/65 dark:text-white/58">{item.safety}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
