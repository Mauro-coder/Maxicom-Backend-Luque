import fs from "fs/promises";

const path = "./practica_fs/data.json";
const data = JSON.stringify([{ product: 1 }, { product: 1 }]);

fs.access(path)
  .then(() => console.log("el archivo existe"))
  .catch(() => {
    console.log("el archivo no existe, creandolo!");
    fs.writeFile(path, data);
  });

fs.writeFile(path, JSON.stringify([]))
  .then(() => console.log("tuvo exito la sobre-escritura"))
  .catch((err) => console.log(err))

fs.readFile(path)
  .then(data=>console.log(JSON.parse(data)))
  .catch((err) => console.log(err))

fs.unlink(path)
  .then(()=>console.log("se eliminó el archivo"))
  .catch((err) => console.log(err))