export function getLinePricing(product, quantity = 1, useCoins = false) {
  const qty = quantity || 1;
  const isPlant = product.category === 'plants' || product.coinDiscountPercent === 100;

  if (isPlant || useCoins) {
    if (isPlant) {
      return {
        coins: product.ecoCoinPrice * qty,
        inr: 0,
        useCoins: true,
        savingsInr: product.priceInr * qty,
      };
    }
    const discountedInr = Math.round(product.priceInr * (1 - product.coinDiscountPercent / 100));
    return {
      coins: product.ecoCoinPrice * qty,
      inr: discountedInr * qty,
      useCoins: true,
      savingsInr: (product.priceInr - discountedInr) * qty,
    };
  }

  return {
    coins: 0,
    inr: product.priceInr * qty,
    useCoins: false,
    savingsInr: 0,
  };
}

export function formatInr(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}
