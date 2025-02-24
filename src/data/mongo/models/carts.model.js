import { Schema, model, Types } from "mongoose";

const collection= "carts"
const schema = new Schema({
    product_id: {type: Types.ObjectId, ref: "products", required: true, index: true },
    user_id: {type: Types.ObjectId, ref: "users", required: true, index: true },
    quantity: { type: Number, default: 1},
    state: {type: String, default: "reserved", enum: ["reserved", "paid", "delivered"], index: true}
},{timestamps: true})

const Cart = model(collection, schema)

export default Cart;