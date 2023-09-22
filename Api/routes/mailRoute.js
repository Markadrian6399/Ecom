import express from "express";
import { sendEmail } from "../utils/mail.js";
import { createError } from "../utils/error.js";
import neh from "nodemailer-express-handlebars";
import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import path from "path";

const router = express.Router();

router.post("/send", sendEmail, async (request, response, next) => {
  try {
    const userExist = await User.findOne({ email: request.body.email });
    if (!userExist) {
      return next(createError(403, "user does not exist"));
    }
    const token = Jwt.sign({ id: userExist._id }, "123456");

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views/"),
    };
    request.transport.use("compile", neh(handlebarOptions));

    const messageOptions = {
      from: "markodiba6399@gmail.com",
      to: request.body.email,
      subject: (request.query.type = "reset" ? "Reset Password" : "You Order"),
      template: (request.query.type = "reset" ? "reset" : "order"),
      context: (request.query.type = "reset"
        ? { token: token, username: userExist.username }
        : { nmae: "math damon" }),
    };

    request.transport.sendMail(messageOptions, (err, data) => {
      if (err) return console.log("Error:", err);
      res.status(200).json(data);
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
});

export default router;
