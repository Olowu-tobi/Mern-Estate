const authservice = require("../service/authService");

const loginUser = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const loginResp = await authservice.loginUser(email, password, username);
    res.status(200).json({
      message: "User logged in successfully",
      status: true,
      token: loginResp.token,
    });
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await authservice.registerUser(body);
    res.status(200).json({
      message: "User registered successfully",
      status: true,
      token: user.token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
};
