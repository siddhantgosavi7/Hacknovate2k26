const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const pickUserFields = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  ecoScore: user.ecoScore,
  xp: user.xp,
  streak: user.streak,
  badges: user.badges
});

module.exports = {
  sendSuccess,
  createError,
  pickUserFields
};
