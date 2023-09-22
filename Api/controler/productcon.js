import { createError } from "../utils/error.js";
import Products from "../models/productmodels.js";
import { request, response } from "express";

export const allproduct = async (request, response, next) => {
  try {
    const products = await Products.find();
    response.status(200).json(products);
  } catch {
    next(createError(401, error));
  }
};

export const createProduct = async (request, response, next) => {
  try {
    const product = new Products(request.body);
    await product.save();
    response.status(201).json(product);
  } catch {
    next(createError(401, error));
  }
};

export const singleProduct = async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await product.findById(id);
    response.status(200).json(product);
  } catch {
    next(createError(401, error));
  }
};

export const bycategory = async (request, response, next) => {
  try {
    const { category } = response.query;
    const products = await products.find({ category: category });
    response.status(200).json(products);
  } catch {
    next(createError(401, error));
  }
};

export const byprice = async (request, response, next) => {
  try {
    const { min, max } = request.query;
    const products = await products.find({ price: { $gte: min, $lte: max } });
    response.status(200).json(products);
  } catch {
    next(createError());
  }
};

export const updateProduct = async (request, response, next) => {
  try {
    const { id } = response.params;
    const product = await products.findByIdAndUpdate(
      id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json(products);
  } catch {
    next(createError(401, error));
  }
};

export const DeletProduct = async (request, response, next) => {
  try {
    const { id } = request.params;
    await products.findByIdAndRemove(id);
    response.status(200).json({ message: "Products deleted" });
  } catch {
    next(createError(401, error));
  }
};
