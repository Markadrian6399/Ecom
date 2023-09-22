import { createError } from "../utils/error.js";
import userModels from "../models/userModels.js";
import { request, response } from "express";

export const getAlluser = async (request, response, next) => {
  try {
    const User = await User.find();
    response.status(200).json(User);
  } catch {
    next(createError(401, error));
  }
};

export const getSingleuser = async (request, response, next) => {
  try {
    const User = await User.find();
    response.status(200).json(User);
  } catch {
    next(createError(401, error));
  }
};

export const DeleteAlluser = async (request, response, next) => {
  try {
    const User = await User.find();
    response.status(200).json(User);
  } catch {
    next(createError(401, error));
  }
};

export const upDateuser = async (request, response, next) => {
  try {
    const User = await User.find();
    response.status(200).json(User);
  } catch {
    next(createError(401, error));
  }
};
