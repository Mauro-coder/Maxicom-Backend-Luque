import express, { response } from "express"
import productsManager from "./src/data/fs/products.fs.js";

/* Server Settings */
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);


/* funcionalidades aplicadas al servidor*/

server.use(express.urlencoded({extended: true}));

/* router */
const indexPoint = "/";
const indexCb = (req, res)=> res.status(200).send("Welcome to my Commerce");
server.get(indexPoint, indexCb);

const apiPoint = "/api";
const apiCb = (req, res)=> res.status(200).send("Welcome to my API");
server.get(apiPoint, apiCb);


const readOneProduct = async(req, res)=>{
    const {pid} = req.params
    const one = await productsManager.readOne(pid)
    if(one) {
        return res.status(200).json ({response: One});
    }
    return res.status(400).json({response: "Not Found"})
};
server.get("/api/products/:pid", readOneProduct)

const readProducts = async (req, res) => {
    const { category } = req.query;
    const all = await productsManager.readAll(category);
    if (all.length > 0) {
      return res.status(200).json({ response: all });
    }
    return res.status(404).json({ response: "Not found!" });
  };
  server.get("/api/products", readProducts);

// server.get("/api/:name/:age", (req,res)=>{
//     const {name, age} = req.params
//     const message = `Hola ${name}! Tienes ${age} años!`;
//     return res.status(200).send(message)
// });

// server.get("/api/welcome", (req, res)=>{
//     const {name, age} = req.query
//     const message= `Hola ${name || "Coder"}! Tienes ${age || 18} años!`;
//     return res.status(200).send(message)
// })



/* Las rutas inexistentes siempre van al final */
server.get("*", (req, res) => res.status(404).send("NOT FUND POINT"));