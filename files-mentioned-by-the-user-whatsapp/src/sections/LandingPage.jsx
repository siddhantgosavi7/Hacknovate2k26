import { ArrowRight, Play, ScanLine } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import HeroIllustration from '../components/HeroIllustration.jsx';
import { GlassCard, IconBadge, PillButton } from '../components/UI.jsx';
import { features, heroStats } from '../data/mockData.js';

export default function LandingPage({ setActiveSection }) {
  const jump = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-32 sm:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-eco-700/15 bg-white/70 px-4 py-2 text-sm font-black text-eco-800 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:text-eco-100">
            <span className="h-2 w-2 rounded-full bg-eco-500 shadow-glow" />
            AI-powered clean city platform
          </div>
          <h1 className="max-w-5xl text-5xl font-black leading-[1.02] tracking-tight text-ink-950 dark:text-white sm:text-6xl lg:text-7xl">
            Transforming Citizens into <span className="gradient-text">Smart Recyclers</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-800/68 dark:text-white/64">
            EcoSort AI helps people scan waste, sort it correctly, earn rewards, schedule pickups, and gives municipalities the analytics they need to run cleaner cities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PillButton onClick={() => jump('scanner')} className="px-6 py-4">
              <ScanLine className="h-5 w-5" />
              Scan Waste
            </PillButton>
            <PillButton variant="secondary" onClick={() => jump('dashboard')} className="px-6 py-4">
              <Play className="h-5 w-5" />
              View Dashboard
            </PillButton>
          </div>
        </motion.div>

        <HeroIllustration />
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-3">
        {heroStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={stat.label} delay={index * 0.08} className="rounded-[1.6rem]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-ink-800/58 dark:text-white/52">{stat.label}</p>
                  <p className="mt-2 text-3xl font-black text-ink-950 dark:text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                </div>
                <IconBadge icon={Icon} />
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mx-auto mt-6 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <GlassCard key={feature.title} delay={index * 0.08} className="group rounded-[1.6rem] transition hover:-translate-y-1 hover:border-eco-400/60">
              <IconBadge icon={Icon} className="transition group-hover:scale-110" />
              <h3 className="mt-5 text-xl font-black text-ink-950 dark:text-white">{feature.title}</h3>
              <p className="mt-3 leading-7 text-ink-800/62 dark:text-white/56">{feature.text}</p>
              <ArrowRight className="mt-5 h-5 w-5 text-eco-700 transition group-hover:translate-x-1 dark:text-eco-200" />
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
