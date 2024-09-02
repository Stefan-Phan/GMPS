const User = require('../models/user')

const register = async (req, res) => {
  res.status(200).send("Register");
};

const login = async (req, res) => {
  res.status(200).send("Login");
};

module.exports = {
  register,
  login,
};
