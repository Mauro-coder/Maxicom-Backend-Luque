import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "none" },
    stock: { type: Number, default: 100 },
    price: { type: Number, default: 300 },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/products-icon/products-icon-8.jpg",
    },
  },
  { timestamps: true }
);

const Product = model(collection, schema);

export default Product;