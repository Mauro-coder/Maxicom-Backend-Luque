import crypto from "crypto";
const { PERSISTENCE } = process.env;

class ProductDTO {
  constructor(data) {
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.title = data.title;
    this.description = data.description;
    this.category = data.category || "Celulares";
    this.stock = data.stock || 100;
    this.price = data.price || 300;
    this.image = data.image || "https://icon-library.com/images/products-icon/products-icon-8.jpg";
    this.onsale = data.onsale || false;
    this.owner_id = data.owner_id;

    if (PERSISTENCE === "MONGO") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default ProductDTO;
