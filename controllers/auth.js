const User = require('../models/user')

const register = async (req, res) => {
  try {
    const user = await User.create({...req.body});

    // Generate a JWT token
    const token = user.createJWT();

    // Respond with the created user and token
    res.status(201).json({ user: { name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = user.createJWT();
    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = {
  register,
  login,
};
