import { AnimatePresence, motion } from 'framer-motion';
import { Coins, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { formatInr, getLinePricing } from '../utils/marketplacePricing.js';
import { PillButton } from './UI.jsx';
import api from '../api.js';
import { useTranslation } from '../contexts/TranslationContext.jsx';

export default function CartDrawer() {
  const { t } = useTranslation();
  const { items, totals, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, updateEcoCoins } = useAuth();
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [checkoutError, setCheckoutError] = useState('');

  const checkout = async () => {
    if (!user) return;
    if (items.length === 0) return;
    if ((user.ecoCoins || 0) < totals.coins) return;

    setCheckingOut(true);
    setCheckoutError('');
    try {
      const res = await api.post('/marketplace/checkout', {
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
          useCoins: i.useCoins,
        })),
      });
      updateEcoCoins(res.data.data.user.ecoCoins);
      setOrderId(res.data.data.order.id);
      clearCart();
    } catch (err) {
      setCheckoutError(err.response?.data?.error || 'Checkout failed');
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-ink-950/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[71] flex w-full max-w-md flex-col border-l border-eco-900/10 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-ink-900/98"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <motion.div className="flex items-center justify-between border-b border-eco-900/10 p-5 dark:border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-eco-600" />
                <div>
                  <p className="text-lg font-black">{t('cart.yourCart')}</p>
                  <p className="text-sm font-bold text-ink-800/50 dark:text-white/50">{totals.count} {t('common.items')}</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-eco-50 dark:hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </motion.div>

            <div className="flex-1 overflow-y-auto p-5">
              {orderId && (
                <motion.div
                  className="mb-4 rounded-2xl border border-lime-300/40 bg-lime-50 p-4 dark:bg-lime-300/10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-black text-eco-800 dark:text-lime-200">{t('cart.orderConfirmed')}</p>
                  <p className="mt-1 text-sm font-bold text-ink-800/60 dark:text-white/60">ID: {orderId}</p>
                </motion.div>
              )}

              {checkoutError && (
                <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 dark:bg-red-500/15 dark:text-red-300">
                  {checkoutError}
                </p>
              )}

              {items.length === 0 && !orderId && (
                <p className="py-12 text-center font-bold text-ink-800/50 dark:text-white/50">{t('cart.empty')}</p>
              )}

              {items.map((item) => {
                const line = getLinePricing(item.product, item.quantity, item.useCoins);
                return (
                  <div
                    key={`${item.product.id}-${item.useCoins}`}
                    className="mb-4 flex gap-4 rounded-2xl border border-eco-900/8 bg-eco-50/50 p-4 dark:border-white/10 dark:bg-white/6"
                  >
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl shadow-sm dark:bg-white/10">
                      {item.product.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-black">{item.product.name}</p>
                      {item.useCoins ? (
                        <p className="mt-1 flex items-center gap-1 text-sm font-bold text-eco-700 dark:text-eco-300">
                          <Coins className="h-3.5 w-3.5" />
                          {line.coins} EcoCoins
                          {line.inr > 0 && ` + ${formatInr(line.inr)}`}
                        </p>
                      ) : (
                        <p className="mt-1 text-sm font-bold">{formatInr(line.inr)}</p>
                      )}
                      <motion.div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.useCoins, item.quantity - 1)}
                          className="grid h-8 w-8 place-items-center rounded-full bg-white dark:bg-white/10"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-black">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.useCoins, item.quantity + 1)}
                          className="grid h-8 w-8 place-items-center rounded-full bg-white dark:bg-white/10"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.useCoins)}
                          className="ml-auto rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>

            <motion.div className="border-t border-eco-900/10 p-5 dark:border-white/10">
              {totals.coins > 0 && (
                <div className="mb-2 flex justify-between font-bold">
                  <span className="text-ink-800/60 dark:text-white/60">{t('cart.ecoCoinsLabel')}</span>
                  <span className="flex items-center gap-1 text-eco-700 dark:text-eco-300">
                    <Coins className="h-4 w-4" />
                    {totals.coins}
                  </span>
                </div>
              )}
              {totals.inr > 0 && (
                <div className="mb-4 flex justify-between font-bold">
                  <span className="text-ink-800/60 dark:text-white/60">{t('cart.cashTotal')}</span>
                  <span>{formatInr(totals.inr)}</span>
                </div>
              )}
              {user && (
                <p className="mb-4 text-center text-xs font-bold text-ink-800/45 dark:text-white/45">
                  {t('cart.balance', { coins: user.ecoCoins })}
                </p>
              )}
              {!user ? (
                <Link to="/login" className="block">
                  <PillButton className="w-full py-4">{t('cart.signInCheckout')}</PillButton>
                </Link>
              ) : (
                <PillButton
                  className="w-full py-4"
                  disabled={items.length === 0 || checkingOut || (user.ecoCoins || 0) < totals.coins}
                  onClick={checkout}
                >
                  {checkingOut ? t('cart.processing') : t('cart.checkout')}
                </PillButton>
              )}
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
