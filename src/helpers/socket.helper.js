import { socketServer } from "../../index.js";
import productsManager from "../data/fs/products.fs.js";

async function socketHelper(socket) {
  console.log("SOCKET ID: " + socket.id);

  const products = await productsManager.readAll();

  /* socket emite SOLO al socket id */
  socket.emit("products", products);

  socket.on("new user", async (data) => {
    await productsManager.create(data);
    const products = await productsManager.readAll();
    /* socketServer emite a TODOS los sockets */
    socketServer.emit("products", products);
  });
}

export default socketHelper;