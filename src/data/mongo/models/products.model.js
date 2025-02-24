import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    category: { type: String, default: "none", index: true },
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