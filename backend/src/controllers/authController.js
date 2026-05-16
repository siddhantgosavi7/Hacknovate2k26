const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { createError, pickUserFields, sendSuccess } = require("../utils/helpers");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw createError("Name, email and password are required", 400);
  }

  if (password.length < 6) {
    throw createError("Password must be at least 6 characters", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError("User already exists", 409);
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return sendSuccess(res, 201, "User registered successfully", {
    user: pickUserFields(user),
    token
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError("Email and password are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    throw createError("Invalid email or password", 401);
  }

  const token = generateToken(user._id);

  return sendSuccess(res, 200, "User logged in successfully", {
    user: pickUserFields(user),
    token
  });
});

module.exports = {
  register,
  login
};
