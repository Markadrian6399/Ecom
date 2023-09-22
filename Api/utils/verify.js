import { request, response } from "express";
import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const VerifyToken = (request, response, next) => {
  const token = request.cookies.access_token;
  if (!token) {
    return next(createError(403, "No Token"));
  }
  jwt.verify(token, "123456", (error, user) => {
    if (error) {
      return next(createError(401, "you are not authourise"));
    } else {
      request.user = user;
      next();
    }
  });
};

export const verifyAdmin = (request, response, next) => {
  VerifyToken(request, response, () => {
    if (request.user.isAdmin) {
      next();
    } else {
      return next(createError(401, "you are not an admin"));
    }
  });
};
