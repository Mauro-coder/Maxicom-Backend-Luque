import { faker } from "@faker-js/faker";
import fs from "fs/promises";

const path = "./src/data/fs/files/products.json";

class ProductsManager {
  constructor() {
    this.path = path;
    this.init();
  }
  async init() {
    try {
      await fs.access(this.path);
    } catch (error) {
      await fs.writeFile(this.path, JSON.stringify([]));
    }
  }
  async readFile() {
    try {
      let data = await fs.readFile(this.path);
      data = JSON.parse(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async writeFile(data) {
    try {
      data = JSON.stringify(data, null, 2);
      await fs.writeFile(this.path, data);
    } catch (error) {
      throw error;
    }
  }
  async create() {
    try {
      const _id = faker.database.mongodbObjectId();
      const title = faker.commerce.productName();
      const price = faker.commerce.price({ min: 10, max: 500, dec: 2 });
      const stock = faker.number.int({ min: 0, max: 1000 });
      const photo = faker.image.url();
      const category = faker.helpers.arrayElement([
        "ninguna",
        "celulares",
        "computadoras",
        "accesorios",
      ]);
      const newProduct = {
        _id,
        title,
        price,
        stock,
        photo,
        category,
      };
      //una vez construido el producto
      //se lee el archivo
      const dataOfFile = await this.readFile();
      //se pushea el nuevo producto
      dataOfFile.push(newProduct);
      //se sobre escribe el archivo con la nueva data
      await this.writeFile(dataOfFile);
      //retorno el nuevo producto al cliente
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
  async readAll(category) {
    try {
      let all = await this.readFile();
      if (category) {
        all = all.filter((each) => each.category === category);
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const all = await this.readFile();
      const one = all.find((each) => each._id === id);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;