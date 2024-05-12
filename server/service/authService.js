const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const saltrounds = 10;

const loginUser = async (email, password, username) => {
  // check for user with email or username
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new Error("User not found");
  }
  // check for password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  // generate token
  const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  return { token };
};

const registerUser = async (userdata) => {
  const { username, email, password } = userdata;
  // check for user with email or username
  const user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (user) {
    throw new Error("User already exists");
  }
  // hash password
  const salt = await bcrypt.genSalt(saltrounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  // generate token
  const token = jwt.sign({ user_id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  return { token };
};

module.exports = {
  loginUser,
  registerUser,
};
