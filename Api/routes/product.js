import express, { Router, request, response } from "express";
import {
  allproduct,
  createProduct,
  singleProduct,
  bycategory,
  byprice,
  updateProduct,
  DeletProduct,
} from "../controler/productcon.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();
router.get("/", allproduct);
router.get("/category", bycategory);
router.get("/price", byprice);
router.post("/", createProduct);
router.get("/:id", singleProduct);
router.put("/:id", updateProduct);
router.delete("/:id", DeletProduct);

export default router;
