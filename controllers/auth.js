import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Email already exists. Please use a different email.");
    }

    const user = await User.create({ ...req.body });

    const token = user.createJWT();

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ user: { name: user.name, email: user.email }, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json(`Email does not exist`);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(StatusCodes.UNAUTHORIZED).json("Wrong password");
  }

  const token = user.createJWT();

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, role: user.role, _id: user.id }, token });
};

const logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  return res.status(StatusCodes.OK).send("Successfully logged out");
};

export default {
  register,
  login,
  logout,
};
