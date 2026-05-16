import express from 'express';
import { authMiddleware } from './auth.js';
import { marketplaceProducts, findProduct } from '../data/marketplaceProducts.js';
import { deductEcoCoins, findUserById, publicUser } from '../data/users.js';

const router = express.Router();
const orders = [];

function lineTotal(product, quantity, useCoins) {
  const qty = quantity || 1;
  if (product.category === 'plants' || product.coinDiscountPercent === 100) {
    return {
      coins: product.ecoCoinPrice * qty,
      inr: 0,
      useCoins: true,
    };
  }
  if (useCoins) {
    const discountedInr = Math.round(product.priceInr * (1 - product.coinDiscountPercent / 100));
    return {
      coins: product.ecoCoinPrice * qty,
      inr: discountedInr * qty,
      useCoins: true,
    };
  }
  return { coins: 0, inr: product.priceInr * qty, useCoins: false };
}

// GET /api/v1/marketplace/products
router.get('/products', (req, res) => {
  res.status(200).json({ data: { products: marketplaceProducts } });
});

// POST /api/v1/marketplace/checkout
router.post('/checkout', authMiddleware, (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const user = findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  let totalCoins = 0;
  let totalInr = 0;
  const orderLines = [];

  for (const item of items) {
    const product = findProduct(item.productId);
    if (!product) {
      return res.status(400).json({ error: `Unknown product: ${item.productId}` });
    }
    const useCoins = item.useCoins ?? product.category === 'plants';
    const totals = lineTotal(product, item.quantity, useCoins);
    totalCoins += totals.coins;
    totalInr += totals.inr;
    orderLines.push({
      productId: product.id,
      name: product.name,
      quantity: item.quantity || 1,
      useCoins,
      coinsPaid: totals.coins,
      inrPaid: totals.inr,
    });
  }

  if ((user.ecoCoins || 0) < totalCoins) {
    return res.status(400).json({
      error: 'Insufficient EcoCoins',
      required: totalCoins,
      balance: user.ecoCoins || 0,
    });
  }

  if (totalCoins > 0) {
    deductEcoCoins(user.id, totalCoins);
  }

  const order = {
    id: `ECO-${Date.now()}`,
    userId: user.id,
    items: orderLines,
    totalCoins,
    totalInr,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);

  res.status(200).json({
    data: {
      order,
      user: publicUser(findUserById(user.id)),
    },
  });
});

export default router;
