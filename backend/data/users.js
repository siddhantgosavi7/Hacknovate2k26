export const users = [
  {
    id: 1,
    email: 'admin@ecosort.ai',
    password: 'Admin@12345',
    name: 'Admin User',
    ecoScore: 894,
    rewardPoints: 12840,
    ecoCoins: 320,
    streak: 31,
  },
];

let nextId = 2;

export function findUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id) {
  return users.find((u) => u.id === id);
}

export function createUser({ name, email, password }) {
  const user = {
    id: nextId++,
    email: email.toLowerCase(),
    password,
    name,
    ecoScore: 0,
    rewardPoints: 0,
    ecoCoins: 100,
    streak: 0,
  };
  users.push(user);
  return user;
}

export function awardEcoCoins(userId, amount, reason) {
  const user = findUserById(userId);
  if (!user) return null;
  user.ecoCoins = (user.ecoCoins || 0) + amount;
  return { user, amount, reason, balance: user.ecoCoins };
}

export function deductEcoCoins(userId, amount) {
  const user = findUserById(userId);
  if (!user || (user.ecoCoins || 0) < amount) return null;
  user.ecoCoins -= amount;
  return user;
}

export function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    ecoScore: user.ecoScore,
    rewardPoints: user.rewardPoints,
    ecoCoins: user.ecoCoins || 0,
    streak: user.streak,
  };
}
