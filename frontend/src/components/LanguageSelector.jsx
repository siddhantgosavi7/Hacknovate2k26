import { Languages } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext.jsx';

export default function LanguageSelector({ className = '' }) {
  const { language, setLanguage } = useTranslation();

  return (
    <div className={`flex items-center gap-2 rounded-full border border-eco-800/10 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-white/8 ${className}`}>
      <Languages className="h-4 w-4 shrink-0 text-eco-700 dark:text-eco-200" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="max-w-[7rem] bg-transparent text-sm font-bold outline-none dark:text-white"
        aria-label="Select language"
      >
        <option value="English">English</option>
        <option value="Hindi">हिंदी</option>
        <option value="Marathi">मराठी</option>
      </select>
    </div>
  );
}
