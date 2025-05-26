import DatabaseConnect from "../helpers/dbConnect.helper.js";

const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "memory":
    break;
  case "fs":
    {
        console.log("fs database connected");
      const { productsManager, usersManager } = await import(
        "./fs/manager.fs.js"
      );
      const { cartsManager } = await import("./fs/carts.fs.js");
      dao = { productsManager, usersManager, cartsManager };
    }
    break;
  default:
    {
      const dbConnect1 = new DatabaseConnect(process.env.MONGO_URL);
      const dbConnect2 = new DatabaseConnect(process.env.MONGO_URL);
      const dbConnect3 = new DatabaseConnect(process.env.MONGO_URL);
      const dbConnect4 = new DatabaseConnect(process.env.MONGO_URL);
      dbConnect1.dbConnect(process.env.MONGO_URL);
      const { productsManager } = await import("./mongo/products.mongo.js");
      const { usersManager } = await import("./mongo/users.mongo.js");
      const { cartsManager } = await import("./mongo/carts.mongo.js");
      dao = { productsManager, usersManager, cartsManager };
    }
    break;
}

const { productsManager, usersManager, cartsManager } = dao;
export { productsManager, usersManager, cartsManager };
export default dao;
