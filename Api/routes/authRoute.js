import express, { Router } from "express";
import { register, login, resetpassword } from "../controler/authController.js";

const router = express.Router();

router.post("/", login);
router.post("/register", register);
router.post("/reset", resetpassword);

export default router;
