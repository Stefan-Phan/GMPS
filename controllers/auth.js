const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res, next) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json("Email already exists. Please use a different email.")
    }

    const user = await User.create({ ...req.body });

    // Generate a JWT token
    const token = user.createJWT();
    
    // Assign the token to a cookie
    res.cookie('token', token, {
      httpOnly: true, // the cookie is sent only over HTTP(s) not accessible via JavaScript
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week (in milliseconds)
    })

    res.status(StatusCodes.CREATED).json({ user: { name: user.name, email: user.email }, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;


    if (!email || !password) {
      throw new BadRequestError("Please provide email and password")
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json(`Email does not exist`)
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json('Wrong password')
    }

    const token = user.createJWT();

    // Assign the token to a cookie
    res.cookie('token', token, {
      httpOnly:true,
      maxAge: 1000 * 60 * 60 * 24 * 7 
    })
    res.status(StatusCodes.OK).json({ user: { name: user.name, role: user.role, _id: user.id }, token });
};

const logout = async (req,res) => {
  res.cookie('token', "", {maxAge: 1})
  return res.status(StatusCodes.OK).send("Successfully logged out")
}

module.exports = {
  register,
  login,
  logout
};
