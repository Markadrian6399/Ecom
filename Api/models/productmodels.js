import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    imgs: {
      type: [String],
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
      main: 0,
      max: 5,
    },
    size: {
      type: [Number],
    },
    color: {
      type: [String],
    },
  },
  {
    timestamo: true,
  }
);

export default mongoose.model("Products", productSchema);
