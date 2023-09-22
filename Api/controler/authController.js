import { response } from "express";
import User from "../models/userModel.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (request, response, next) => {
  try {
    const userExist = await User.findOne({ email: request.body.email });
    if (userExist) {
      return next(createError(403, "user alreadt exist"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(request.body.password, salt);
    const user = new User({
      ...request.body,
      password: hashPassword,
    });
    await user.save();
    response.status(201).json(user);
    // console.log ('hello');
  } catch (error) {
    return next(createError(400, error));
  }
};

export const login = async (request, response, next) => {
  try {
    const userExist = await User.findOne({ email: request.body.email });
    if (
      userExist &&
      bcrypt.compareSync(request.body.password, userExist.password)
    ) {
      let { password, ...others } = userExist._doc;
      const token = jwt.sign({ id: userExist.id, isAdmin: userExist.isAdmin });
      response
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(others);
    } else {
      next(createError(403, "invalid Credentials"));
    }
  } catch (error) {
    return next(createError(400, error));
  }
};

export const resetpassword = async (request, response, next) => {
  try {
    const { token } = request.query;
    jwt.verify(token, "123456", async (error, user) => {
      if (error) return next(createError(401, "Token invalid"));
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(request.body.password, salt);

      const users = await User.findByIdAndUpdate(
        user.id,
        { $set: { ...request.body, password: hashPassword } },
        { new: true }
      );
      response.status(200).json(users);
    });
  } catch (error) {
    return next(createError(403, "something went wrong"));
  }
};
