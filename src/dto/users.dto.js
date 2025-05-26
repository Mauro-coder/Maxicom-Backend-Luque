import crypto from "crypto";
import { createHash } from "../helpers/hash.helper.js";
const { PERSISTENCE } = process.env;

class UserDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.name = data.name;
    this.age = data.age;
    this.date = data.date;
    this.city = data.city;
    this.email = data.email;
    this.password = createHash(data.password);
    this.avatar = data.avatar || "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";
    this.role = data.role || "user";
    this.isVerify = data.isVerify || false;
    this.verifyCode = crypto.randomBytes(12).toString("hex");
    if (PERSISTENCE !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default UserDTO;