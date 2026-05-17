import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getLinePricing } from '../utils/marketplacePricing.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product, options = {}) => {
    const useCoins = options.useCoins ?? product.category === 'plants';
    setItems((current) => {
      const existing = current.find((i) => i.product.id === product.id && i.useCoins === useCoins);
      if (existing) {
        return current.map((i) =>
          i.product.id === product.id && i.useCoins === useCoins
            ? { ...i, quantity: i.quantity + (options.quantity || 1) }
            : i,
        );
      }
      return [...current, { product, quantity: options.quantity || 1, useCoins }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((productId, useCoins) => {
    setItems((current) => current.filter((i) => !(i.product.id === productId && i.useCoins === useCoins)));
  }, []);

  const updateQuantity = useCallback((productId, useCoins, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, useCoins);
      return;
    }
    setItems((current) =>
      current.map((i) =>
        i.product.id === productId && i.useCoins === useCoins ? { ...i, quantity } : i,
      ),
    );
  }, [removeFromCart]);

  const toggleUseCoins = useCallback((productId) => {
    setItems((current) => {
      const item = current.find((i) => i.product.id === productId);
      if (!item || item.product.category === 'plants') return current;
      removeFromCart(productId, item.useCoins);
      addToCart(item.product, { useCoins: !item.useCoins, quantity: item.quantity });
      return current.filter((i) => i.product.id !== productId);
    });
  }, [addToCart, removeFromCart]);

  const clearCart = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    let coins = 0;
    let inr = 0;
    items.forEach((item) => {
      const line = getLinePricing(item.product, item.quantity, item.useCoins);
      coins += line.coins;
      inr += line.inr;
    });
    return { coins, inr, count: items.reduce((s, i) => s + i.quantity, 0) };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totals,
      isOpen,
      setIsOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleUseCoins,
      clearCart,
    }),
    [items, totals, isOpen, addToCart, removeFromCart, updateQuantity, toggleUseCoins, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
