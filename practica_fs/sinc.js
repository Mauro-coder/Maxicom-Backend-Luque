import fs from "fs";

const path = "./data/products.manager.js";

const existsFile1 = fs.existsSync(path);
const existsFile2 = fs.existsSync("./data/fs/carts.manager.js");
console.log(existsFile1);
console.log(existsFile2);

if (!existsFile2) {
  const data = JSON.stringify([]);
  fs.writeFileSync("./data/carts.manager.js", data);
}

const data = JSON.stringify([{ prod: 1 }, { prod: 2 }, { prod: 3 }]);
fs.writeFileSync("./data/carts.manager.js", data);
fs.writeFileSync("./data/carts.manager.js", JSON.stringify([]));
fs.writeFileSync("./data/carts.manager.js", data);

let products = fs.readFileSync("./data/carts.manager.js");
products = JSON.parse(products);
console.log(products);

fs.unlinkSync("./data/carts.manager.js")