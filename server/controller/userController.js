const { getUserService } = require("../service/userService");

const getUser = async (req, res, next) => {
  const { user_id } = req.user;
  try {
    const user = await getUserService(user_id);
    res.status(200).json({
      message: "User fetched succesfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
};
