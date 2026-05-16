import { Building2, GraduationCap, ShieldCheck, Trophy, Users } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { GlassCard, IconBadge, ProgressBar } from '../components/UI.jsx';
import { challenges, communityRankings, notifications } from '../data/mockData.js';

export default function Community() {
  return (
    <section id="community" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Community Sustainability"
          title="Turn clean habits into local pride."
          text="Society rankings, college competitions, badges, and sustainability challenges keep recycling visible and social."
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
          <GlassCard>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-eco-700 dark:text-eco-200">Society rankings</p>
                <h3 className="mt-2 text-2xl font-black text-ink-950 dark:text-white">Green community league</h3>
              </div>
              <IconBadge icon={Building2} />
            </div>
            <div className="space-y-4">
              {communityRankings.map((community, index) => {
                const Icon = community.icon;
                return (
                  <div key={community.name} className="rounded-[1.5rem] bg-eco-50 p-4 dark:bg-white/8">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-950 text-white dark:bg-eco-500">#{index + 1}</div>
                      <Icon className="h-6 w-6 text-eco-700 dark:text-eco-200" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-black">{community.name}</p>
                        <p className="text-sm font-bold text-ink-800/52 dark:text-white/48">{community.badge}</p>
                      </div>
                      <p className="text-2xl font-black text-eco-700 dark:text-eco-200">{community.score}</p>
                    </div>
                    <div className="mt-4">
                      <ProgressBar value={community.score} label="" />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <div className="grid gap-5">
            <GlassCard className="bg-gradient-to-br from-ink-950 to-eco-800 text-white">
              <IconBadge icon={GraduationCap} className="bg-white/12 text-white" />
              <h3 className="mt-5 text-3xl font-black">College competitions</h3>
              <p className="mt-4 leading-8 text-white/66">
                Campus leagues track scan accuracy, e-waste collections, and zero-mixed-waste hostel performance.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {['48 colleges', '1.8M XP', '32 drives'].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/12 p-4 text-center text-sm font-black">
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-ink-950 dark:text-white">Green badges</h3>
                <IconBadge icon={ShieldCheck} />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['Zero Waste', 'Clean Campus', 'Route Saver'].map((badge) => (
                  <div key={badge} className="rounded-[1.25rem] bg-eco-50 p-4 text-center dark:bg-white/8">
                    <Trophy className="mx-auto h-6 w-6 text-eco-700 dark:text-eco-200" />
                    <p className="mt-3 text-sm font-black">{badge}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <GlassCard>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-black text-ink-950 dark:text-white">Sustainability challenges</h3>
              <IconBadge icon={Users} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {challenges.map((challenge) => {
                const Icon = challenge.icon;
                return (
                  <div key={challenge.title} className="rounded-[1.5rem] bg-eco-50 p-5 dark:bg-white/8">
                    <Icon className="h-7 w-7 text-eco-700 dark:text-eco-200" />
                    <h4 className="mt-5 font-black">{challenge.title}</h4>
                    <p className="mt-3 text-sm font-bold text-ink-800/55 dark:text-white/50">{challenge.participants.toLocaleString()} participants</p>
                    <p className="mt-3 rounded-full bg-white px-3 py-2 text-center text-xs font-black text-eco-700 dark:bg-white/10 dark:text-eco-200">{challenge.reward}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-6 text-2xl font-black text-ink-950 dark:text-white">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((note) => {
                const Icon = note.icon;
                return (
                  <div key={note.title} className="flex gap-3 rounded-[1.5rem] bg-eco-50 p-4 dark:bg-white/8">
                    <IconBadge icon={Icon} className="h-11 w-11 rounded-2xl" />
                    <div>
                      <p className="font-black">{note.title}</p>
                      <p className="mt-1 text-sm leading-6 text-ink-800/58 dark:text-white/52">{note.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
