import productsManager from "../data/mongo/products.mongo.js";
import cartsManager from "../data/mongo/carts.mongo.js"; // Asegúrate de tener un modelo para registrar compras

const purchaseProduct = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.session?.user?.id; // Suponiendo que tienes autenticación con sesiones

  try {
    // Verificar si el producto existe
    const product = await productsManager.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Verificar si hay stock suficiente
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Stock insuficiente" });
    }

    // Simulación de pago (aquí podrías integrar una pasarela real como Stripe o MercadoPago)
    const paymentSuccessful = true; // Esto debe cambiar a una lógica real
    if (!paymentSuccessful) {
      return res.status(400).json({ message: "Error en el pago" });
    }

    // Reducir el stock disponible
    product.stock -= quantity;
    await product.save();

    // Registrar la compra en la colección de órdenes
    const newOrder = new cartsManager({
      user: userId,
      product: productId,
      quantity,
      total: product.price * quantity,
      status: "Pagado",
    });
    await newOrder.save();

    res.status(200).json({ message: "Compra realizada con éxito", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error en la compra", error });
  }
};

export { purchaseProduct };
