import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String },
    category: { type: String, default: "None",enum: ["Smartphones", "Accesories", "Smartwatches","Headphones","Gaming", "Peripherals", "None"], index: true },
    stock: { type: Number, default: 100 },
    price: { type: Number, default: 300 },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/products-icon/products-icon-8.jpg",
    },
    onsale: { type: Boolean, default: false },
    owner_id: { type: Types.ObjectId, ref: "users", required: true, index: true },
  },
  { timestamps: true }
);
schema.plugin(mongoosePaginate)

schema.pre(/^find/, function () {
  this.populate("owner_id", "email avatar");
});

const Product = model(collection, schema);

export default Product;