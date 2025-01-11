import fs from "fs";

const path = "./practica_fs/data.json";
const data = JSON.stringify([{ product: 1 }, { product: 1 }]);

/* no existe un metodo asincrono con callbacks para verificar si existe un archivo */
const verify = fs.existsSync(path);
console.log(verify);

if (!verify) {
  console.log("no existe el archivo y lo crea de forma asincrona");
  fs.writeFile(path, data, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

fs.readFile(path, "utf-8", (error, data) => {
  //la callback depende del error y de la data leida
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.parse(data));
  }
});

fs.unlink(path, (error) => {
  if (error) {
    console.log(error);
  }
});