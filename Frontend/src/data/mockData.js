import {
  Award,
  Battery,
  Bell,
  Bike,
  BottleWine,
  Boxes,
  CalendarCheck,
  Camera,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleGauge,
  Cpu,
  Flame,
  GlassWater,
  Leaf,
  Medal,
  MessageCircle,
  Recycle,
  Route,
  ShieldAlert,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'scanner', label: 'Scanner' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'guide', label: 'Guide' },
  { id: 'pickup', label: 'Pickup' },
  { id: 'community', label: 'Community' },
];

export const heroStats = [
  { label: 'Waste Recycled', value: 128420, suffix: 'kg', icon: Recycle },
  { label: 'CO2 Saved', value: 38470, suffix: 'kg', icon: Leaf },
  { label: 'Active Citizens', value: 18632, suffix: '+', icon: Users },
];

export const features = [
  {
    title: 'AI Waste Detection',
    text: 'Camera-first recognition for everyday waste with confidence scoring.',
    icon: Camera,
  },
  {
    title: 'Smart Segregation Guidance',
    text: 'Clear bin, safety, and recycling instructions in local languages.',
    icon: Sparkles,
  },
  {
    title: 'Reward System',
    text: 'EcoScore, streaks, badges, and community challenges that create habits.',
    icon: Trophy,
  },
  {
    title: 'Recycling Analytics',
    text: 'Municipality-grade insights for participation, pickups, and hotspots.',
    icon: ChartNoAxesCombined,
  },
];

export const detectionResult = {
  wasteType: 'Plastic Bottle',
  category: 'Dry Waste',
  recyclable: 'Yes',
  disposal: 'Blue Bin',
  confidence: 94,
  impact: {
    co2: 0.18,
    water: 2.1,
    energy: 0.42,
  },
};

export const achievements = [
  { title: 'Blue Bin Pro', value: '75 dry waste scans', icon: Recycle, color: 'from-blue-500 to-cyan-400' },
  { title: '7-Day Streak', value: 'Daily recycling habit', icon: Flame, color: 'from-orange-500 to-amber-300' },
  { title: 'E-Waste Hero', value: 'Safe disposal champion', icon: Cpu, color: 'from-violet-500 to-fuchsia-400' },
  { title: 'Carbon Saver', value: '120 kg CO2 avoided', icon: Leaf, color: 'from-eco-600 to-emerald-300' },
];

export const leaderboard = [
  { name: 'Aarav Sharma', area: 'Indiranagar', points: 8420, streak: 31 },
  { name: 'Mira Patil', area: 'Baner', points: 7990, streak: 28 },
  { name: 'Kabir Rao', area: 'Koramangala', points: 7425, streak: 22 },
  { name: 'Sneha Iyer', area: 'Viman Nagar', points: 6930, streak: 19 },
];

export const categoryDistribution = [
  { label: 'Plastic', value: 34, color: '#2563eb' },
  { label: 'Organic', value: 28, color: '#1fb767' },
  { label: 'Paper', value: 16, color: '#f59e0b' },
  { label: 'Metal', value: 12, color: '#64748b' },
  { label: 'E-Waste', value: 10, color: '#8b5cf6' },
];

export const pickupRequests = [
  { label: 'Mon', value: 48 },
  { label: 'Tue', value: 62 },
  { label: 'Wed', value: 57 },
  { label: 'Thu', value: 76 },
  { label: 'Fri', value: 89 },
  { label: 'Sat', value: 103 },
  { label: 'Sun', value: 71 },
];

export const participationTrend = [
  { label: 'Jan', value: 32 },
  { label: 'Feb', value: 39 },
  { label: 'Mar', value: 46 },
  { label: 'Apr', value: 58 },
  { label: 'May', value: 67 },
  { label: 'Jun', value: 73 },
  { label: 'Jul', value: 81 },
  { label: 'Aug', value: 88 },
];

export const areaStats = [
  { area: 'Sector 12', dry: 68, wet: 82, ewaste: 21, status: 'High participation' },
  { area: 'Green Park', dry: 52, wet: 71, ewaste: 18, status: 'Pickup optimized' },
  { area: 'Lake View', dry: 76, wet: 65, ewaste: 32, status: 'E-waste drive needed' },
  { area: 'Metro Ward', dry: 44, wet: 58, ewaste: 12, status: 'Awareness needed' },
];

export const heatmapCards = [
  { area: 'Ward A', intensity: 93, label: 'Plastic load' },
  { area: 'Ward B', intensity: 64, label: 'Organic overflow' },
  { area: 'Ward C', intensity: 78, label: 'Pickup demand' },
  { area: 'Ward D', intensity: 42, label: 'Low sorting' },
  { area: 'Ward E', intensity: 86, label: 'Dry waste spike' },
  { area: 'Ward F', intensity: 57, label: 'Mixed waste' },
];

export const activityFeed = [
  { text: 'Smart pickup route updated for Sector 12', time: '2 min ago', icon: Route },
  { text: '312 citizens completed wet/dry segregation challenge', time: '18 min ago', icon: CheckCircle2 },
  { text: 'E-waste hotspot detected near Lake View', time: '45 min ago', icon: ShieldAlert },
  { text: 'Plastic recycling rate crossed 72% this week', time: '1 hr ago', icon: ChartNoAxesCombined },
];

export const guideItems = [
  {
    name: 'Plastic',
    bin: 'Blue Bin',
    recyclable: 'Usually recyclable',
    safety: 'Rinse containers and crush bottles before disposal.',
    icon: BottleWine,
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    name: 'Glass',
    bin: 'Blue Bin',
    recyclable: 'Recyclable',
    safety: 'Wrap broken glass safely and label it before pickup.',
    icon: GlassWater,
    accent: 'from-sky-500 to-teal-300',
  },
  {
    name: 'Metal',
    bin: 'Blue Bin',
    recyclable: 'Highly recyclable',
    safety: 'Empty cans fully and fold sharp lids inward.',
    icon: Boxes,
    accent: 'from-slate-500 to-zinc-300',
  },
  {
    name: 'Organic',
    bin: 'Green Bin',
    recyclable: 'Compostable',
    safety: 'Keep food waste separate from plastic liners.',
    icon: Leaf,
    accent: 'from-eco-600 to-lime-300',
  },
  {
    name: 'E-Waste',
    bin: 'Authorized Center',
    recyclable: 'Special recycling only',
    safety: 'Do not mix with household waste; remove personal data.',
    icon: Battery,
    accent: 'from-violet-500 to-indigo-400',
  },
  {
    name: 'Hazardous Waste',
    bin: 'Red Bin',
    recyclable: 'Not regular recyclable',
    safety: 'Seal batteries, chemicals, and medical waste carefully.',
    icon: ShieldAlert,
    accent: 'from-rose-500 to-orange-400',
  },
];

export const chatbotExamples = [
  {
    q: 'Where should I throw batteries?',
    a: 'Batteries should go to an authorized e-waste collection point or red-bin hazardous collection. Do not place them in wet or dry household bins.',
  },
  {
    q: 'Is pizza box recyclable?',
    a: 'Clean cardboard is recyclable, but greasy pizza-box sections should be composted or placed with wet waste. Tear off the clean top for the blue bin.',
  },
  {
    q: 'How to recycle milk packets?',
    a: 'Rinse, dry, and bundle milk packets. Put them in the blue dry-waste bin or hand them to your local recycler during scheduled pickup.',
  },
];

export const communityRankings = [
  { name: 'Green Heights Society', score: 96, badge: 'Zero Waste Leader', icon: Medal },
  { name: 'Riverdale College', score: 91, badge: 'Campus Champion', icon: Award },
  { name: 'Sunrise Apartments', score: 87, badge: 'Dry Waste Pro', icon: Recycle },
  { name: 'Tech Park Block C', score: 83, badge: 'Smart Pickup Partner', icon: Bike },
];

export const challenges = [
  { title: '7-Day Segregation Sprint', participants: 1842, reward: '500 XP', icon: Zap },
  { title: 'E-Waste Weekend Drive', participants: 936, reward: 'Green Hero badge', icon: Battery },
  { title: 'No Mixed Waste Month', participants: 2210, reward: 'Community trophy', icon: Trophy },
];

export const notifications = [
  { title: 'Pickup reminder', text: 'Dry waste pickup starts at 8:30 AM tomorrow.', icon: CalendarCheck },
  { title: 'AI insight', text: 'Plastic bottle scans are up 18% in your area.', icon: Bell },
  { title: 'EcoScore boost', text: 'You earned 120 XP for consistent segregation.', icon: CircleGauge },
];
