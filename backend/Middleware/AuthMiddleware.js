import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});


export const Active = (req, res, next) => {
  if (req.user && req.user.isActive===true) {
    next();
  } else {
    res.status(401);
    throw new Error("Your Account is Disabled");
  }
};

export const Printing = (req, res, next) => {
  if (req.user && req.user.role==="Imprimerie") {
    next();
  } else {
    res.status(401);
    throw new Error("Your are not a Printing");
  }
};




export default protect;