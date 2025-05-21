import User from "../models/user.js";
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication Invalid" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Authentication Invalid" });
    }

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication Invalid" });
  }
};

export default adminAuth;
