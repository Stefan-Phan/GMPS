const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  // const user = await User.create({ ...req.body });

  // const token = user.createJWT();

  // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  console.log("hey")
};

const login = (req, res) => {
  console.log("Hey");
};

module.exports = {
  login,
  register,
};
