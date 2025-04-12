import cartsManager from "../data/mongo/carts.mongo.js";

const addProductToCart = async (req, res, next) => {
    const { product_id, user_id, quantity } = req.body;
    const response = await cartsManager.addProductToCart(
      product_id,
      user_id,
      quantity
    );
    res.json201(response)
};
const readProductsFromUser = async (req, res, next) => {
    const { user_id } = req.params;
    const all = await cartsManager.readProductsFromUser(user_id);
    if (all.length === 0) {
      res.json404()
    }
    res.json200(all)
};
const updateQuantity = async (req, res, next) => {
    const { cart_id } = req.params;
    const {quantity} = req.body;
    const one = await cartsManager.updateQuantity(cart_id, quantity);
    if (!one) {
      res.json404()
    }
    res.json200(one)
};
const removeProductFromCart = async (req, res, next) => {
    const { cart_id } = req.params;
    const one = await cartsManager.removeProductFromCart(cart_id);
    if (!one) {
      res.json404()
    }
    res.json200(one)
};
const totalToPay = async (req, res, next) => {
    const { user_id } = req.params;
    const total = await cartsManager.totalToPay(user_id);
    return res.status(200).json({
      method: req.method,
      url: req.url,
      response: total,
    });
};
export {
  addProductToCart,
  readProductsFromUser,
  updateQuantity,
  removeProductFromCart,
  totalToPay,
};
