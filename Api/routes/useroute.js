import express, { Router, request, response } from "express";
import {
  getAlluser,
  DeleteAlluser,
  getSingleuser,
  upDateuser,
} from "../controler/usercontroll.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();
router.get("/", getAlluser);
router.get("/category", getSingleuser);
router.get("/price", upDateuser);
router.post("/", DeleteAlluser);

export default getAlluser;
