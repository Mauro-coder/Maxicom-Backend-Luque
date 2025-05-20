import productsManager from "./data/fs/products.fs.js";
import usersManager from "./data/fs/users.fs.js"


async function router(req, res) {
  const { url } = req;
  const type = { "Content-Type": "application/json" };
  try {
    switch (url) {
      case "/":
        const endpoints = {
          "GET '/'": "landing page of e-commerce",
          "GET '/api/products'": "list of all products",
          "GET '/api/products/faker'": "create a faker product",
          "GET '/api/users'": "list of all users",
          "GET '/api/users/faker'": "create a faker user",
        };
        res.writeHead(200, type).end(JSON.stringify(endpoints));
        break;
      case "/api/products/faker":
        // toda la logica para poder crear un nuevo producto falso
        const product = await productsManager.create();
        res.writeHead(201, type).end(JSON.stringify({ response: product }));
        break;
      case "/api/products":
        // toda la logica para poder leer todos los productos
        const products = await productsManager.readAll();
        res.writeHead(200, type).end(JSON.stringify({ response: products }));
        break;
      case "/api/users/faker":
        // toda la logica para poder crear un nuevo usuario falso
        const user = await usersManager.create();
        res.writeHead(201, type).end(JSON.stringify({ response: user }));
        break;
      case "/api/users":
        // toda la logica para poder leer todos los usuarios
        const users = await usersManager.readAll();
        res.writeHead(200, type).end(JSON.stringify({ response: users }));
        break;
      default:
        res
          .writeHead(404, type)
          .end(JSON.stringify({ message: "Not found method/url" }));
        break;
    }
  } catch (error) {
    res.writeHead(500, type).end(JSON.stringify({ message: "Server Error" }));
  }
}

export default router;