import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Leaf, Percent, ShoppingCart, Sparkles } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { GlassCard, PillButton } from '../components/UI.jsx';
import { marketplaceCategories, marketplaceProducts } from '../data/marketplaceData.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { formatInr, getLinePricing } from '../utils/marketplacePricing.js';
import { useTranslation } from '../contexts/TranslationContext.jsx';
import { getProductTranslation } from '../data/translations.js';

function ProductCard({ product }) {
  const { t, languageCode } = useTranslation();
  const pt = getProductTranslation(languageCode, product.id);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [useCoins, setUseCoins] = useState(product.category === 'plants');
  const line = getLinePricing(product, 1, useCoins);
  const isPlant = product.category === 'plants';

  return (
    <GlassCard className="flex h-full flex-col !p-0 overflow-hidden">
      <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-eco-50 to-eco-100 text-7xl dark:from-eco-900/40 dark:to-ink-900">
        {product.emoji}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-eco-800 shadow-sm dark:bg-ink-900/90 dark:text-eco-200">
          {pt.tag || product.tag}
        </span>
        {isPlant && (
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-ink-950">
            <Coins className="h-3 w-3" />
            {t('marketplace.coinsOnly')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-black">{pt.name || product.name}</h3>
        <p className="mt-2 flex-1 text-sm font-bold leading-6 text-ink-800/55 dark:text-white/55">
          {pt.description || product.description}
        </p>

        <div className="mt-4 space-y-2">
          <p className="text-sm font-bold text-ink-800/40 line-through dark:text-white/40">
            {t('marketplace.mrp')} {formatInr(product.priceInr)}
          </p>
          {useCoins ? (
            <p className="flex items-center gap-2 text-lg font-black text-eco-700 dark:text-eco-300">
              <Coins className="h-5 w-5" />
              {line.coins} EcoCoins
              {line.inr > 0 && (
                <span className="text-base text-ink-800/70 dark:text-white/70">+ {formatInr(line.inr)}</span>
              )}
            </p>
          ) : (
            <p className="text-lg font-black">{formatInr(line.inr)}</p>
          )}
          {!isPlant && (
            <p className="flex items-center gap-1 text-xs font-black text-eco-600 dark:text-eco-300">
              <Percent className="h-3.5 w-3.5" />
              {t('marketplace.percentOff', { percent: product.coinDiscountPercent, coins: product.ecoCoinPrice })}
            </p>
          )}
        </div>

        {!isPlant && (
          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-eco-900/10 bg-eco-50/80 px-4 py-3 dark:border-white/10 dark:bg-white/6">
            <input
              type="checkbox"
              checked={useCoins}
              onChange={(e) => setUseCoins(e.target.checked)}
              className="h-4 w-4 accent-eco-600"
            />
            <span className="text-sm font-black">{t('marketplace.applyDiscount')}</span>
          </label>
        )}

        <PillButton
          className="mt-4 w-full py-3.5"
          onClick={() => addToCart(product, { useCoins })}
          disabled={useCoins && user && (user.ecoCoins || 0) < line.coins}
        >
          <ShoppingCart className="h-4 w-4" />
          {t('marketplace.addToCart')}
        </PillButton>
      </div>
    </GlassCard>
  );
}

export default function Marketplace() {
  const { t } = useTranslation();
  const [category, setCategory] = useState('all');
  const { user } = useAuth();
  const { totals, setIsOpen } = useCart();

  const filtered = useMemo(() => {
    if (category === 'all') return marketplaceProducts;
    return marketplaceProducts.filter((p) => p.category === category);
  }, [category]);

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={t('marketplace.eyebrow')}
          title={t('marketplace.title')}
          text={t('marketplace.text')}
        />

        <GlassCard className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-lime-300 to-eco-600 text-ink-950">
              <Coins className="h-7 w-7" />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-eco-700 dark:text-eco-300">
                {t('marketplace.yourBalance')}
              </p>
              <p className="text-3xl font-black">
                {user ? `${user.ecoCoins} ${t('common.ecoCoins')}` : t('marketplace.signInBalance')}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <PillButton variant="secondary" onClick={() => setIsOpen(true)}>
              <ShoppingCart className="h-4 w-4" />
              {t('marketplace.cart')} ({totals.count})
            </PillButton>
          </div>
        </GlassCard>

        <div className="mb-8 flex flex-wrap gap-2">
          {marketplaceCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-black transition ${
                category === cat.id
                  ? 'bg-ink-950 text-white dark:bg-eco-500'
                  : 'bg-eco-50 text-ink-800 hover:bg-eco-100 dark:bg-white/8 dark:text-white dark:hover:bg-white/12'
              }`}
            >
              {t(`marketplace.${cat.id}`)}
              {cat.badge && (
                <span className="ml-2 text-xs opacity-70">• {cat.badge ? t(`marketplace.${cat.id}Badge`) : ''}</span>
              )}
            </button>
          ))}
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Leaf, title: t('marketplace.plants'), text: t('marketplace.plantsInfo') },
            { icon: Sparkles, title: t('marketplace.decor'), text: t('marketplace.decorInfo') },
            { icon: Percent, title: t('marketplace.clothes'), text: t('marketplace.clothesInfo') },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[1.5rem] border border-eco-900/8 bg-white/50 p-5 dark:border-white/10 dark:bg-white/6"
            >
              <Icon className="h-6 w-6 text-eco-600" />
              <p className="mt-3 font-black">{title}</p>
              <p className="mt-1 text-sm font-bold text-ink-800/55 dark:text-white/55">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
