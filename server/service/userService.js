const User = require("../models/userModel");

const getUserService = async (userId) => {
  try {
    const profile = await User.findOne({ _id: userId }).select("-password");
    return profile;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  getUserService,
};
