import { faker } from "@faker-js/faker";
import fs from "fs/promises";

const path = "./data/fs/files/users.json";

class UsersManager {
  constructor() {
    this.path = path;
    this.init();
  }
  async init() {
    try {
      await fs.access(this.path);
    } catch (error) {
      await fs.writeFile(path, JSON.stringify([]));
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
      const fullName = faker.person.fullName().toLowerCase().split(" ");
      const user = {
        _id: faker.database.mongodbObjectId(),
        name: fullName[0],
        lastName: fullName[1],
        email: fullName.join(".") + "@coder.com",
        password: "hola1234",
        age: faker.number.int({ min: 18, max: 70 }),
        avatar: faker.image.avatar(),
        role: faker.helpers.arrayElement(["user", "admin", "premium"]),
      };
      //una vez construido el usuario
      //se lee el archivo
      const dataOfFile = await this.readFile();
      //se pushea el nuevo usuario
      dataOfFile.push(user);
      //se sobre escribe el archivo con la nueva data
      await this.writeFile(dataOfFile);
      //retorno el nuevo usuario al cliente
      return user;
    } catch (error) {
      throw error;
    }
  }
  async readAll() {
    try {
      return await this.readFile();
    } catch (error) {
      throw error;
    }
  }
}

const usersManager = new UsersManager();
export default usersManager;