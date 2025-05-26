import { Types } from "mongoose";
import Manager from "./manager.mongo.js";
import Cart from "./models/carts.model.js";

class CartsManager extends Manager {
  constructor() {
    super(Cart);
  }
  addProductToCart = async (product_id, user_id, quantity) => {
    try {
      const one = await this.create({ product_id, user_id, quantity });
      return one;
    } catch (error) {
      throw error;
    }
  };
  readProductsFromUser = async (user_id) => {
    try {
      const all = await this.readAll({ user_id, state: "reserved" });
      return all;
    } catch (error) {
      throw error;
    }
  };
  updateQuantity = async (cart_id, quantity) => {
    try {
      const one = await this.updateById(cart_id, { quantity });
      return one;
    } catch (error) {
      throw error;
    }
  };
  removeProductFromCart = async (cart_id) => {
    try {
      const one = await this.destroyById(cart_id);
      return one;
    } catch (error) {
      throw error;
    }
  };
  totalToPay = async (user_id) => {
    try {
      const pipeline = [
        { $match: { user_id: new Types.ObjectId(user_id) } },
        { $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "product" } },
        { $unwind: "$product" },
        { $lookup: { from: "users", localField: "user_id", foreignField: "_id", as: "user" } },
        { $unwind: "$user" },
        { $addFields: {
          subtotal: { $multiply: ["$product.price","$quantity"]}
        }},
        { $group: {
          _id: "$user_id",
          email: { $first: "$user.email" },
          products: {
            $push: {
              title: "$product.title",
              price: "$product.price",
              quantity: "$quantity",
              subtotal: "$subtotal"
            }
          },
          total: { $sum: "$subtotal"}
        }},
        { $project: { _id: 0 }}
      ];
      const total = await this.model.aggregate(pipeline);
      return total;
    } catch (error) {
      throw error;
    }
  };
}


const cartsManager = new CartsManager();

export { cartsManager };
