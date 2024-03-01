import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { AppError } from "../utilis/appError.js";
import AppError from '../middlewares/error.js';
import { globalErrorHandler } from "../middlewares/error.js";


export const signup = async (req, res, next) => {
  try {
    // console.log("req.body: ", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All field required",
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      // return next(new AppError("User already exists", 400));
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const protectedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: protectedPassword,
    });

    const jwtToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.setHeader('Authorization', `Bearer ${jwtToken}`);

    res.status(200).json({
      success: true,
      message: "Signup Successfull",
      jwtToken,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return next(new AppError("All Fields are required", 400));
      res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }


    let user = await User.findOne({ email });
    if (!user) {
      // return next(new AppError("Invalid email or password", 400));
      res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // console.log("user login: ", user);
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      // return next(new AppError("Invalid password", 400));
      res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const jwtToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.setHeader('Authorization', `Bearer ${jwtToken}`);
    console.log(User.name);

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      jwtToken,
      user
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const body = req.body;
    const { name, email, password, oldPassword, newPassword } = req.body;

    console.log("updatePassword body: ", body);

    if (!password || !oldPassword.trim() || !newPassword.trim()) {
      // return next(new AppError("All Fields are required", 400));
      res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
      return {};
    }


    let user = await User.findOne({ email });
    if (!user) {
      // return next(new AppError("Invalid email or password", 400));
      res.status(400).json({
        success: false,
        message: "Invalid current credentials. Try after log in in again",
      });
      return {};
    }
    // console.log("user login: ", user);
    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      // return next(new AppError("Invalid password", 400));
      res.status(400).json({
        success: false,
        message: "Old password Invalid",
      });
      return {};
    }

    if (newPassword.trim() == oldPassword.trim()) {
      res.status(400).json({
        success: false,
        message: "new password is same as old password",
      });
      return {};
    }

    const protectedPassword = await bcrypt.hash(newPassword, 10);

    if (newPassword.trim() !== oldPassword.trim()) {
      user = await User.updateOne({ email }, { $set: { name: name, password: protectedPassword } });
    }


    res.status(200).json({
      success: true,
      message: "User Info Updated Successfully",
      user
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.setHeader('Authorization', '');
    res.status(200).json({ message: 'Logged Out', });
  } catch (error) {
    next(error);
  }
};