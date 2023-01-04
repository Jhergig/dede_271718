import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';

const api:Router = express.Router()

const mongoose = require("mongoose");

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

const productoSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  precio: Number,
  peso: Number,
  descripcion: String
})
const Producto = mongoose.model("productos", productoSchema);

const pedidoSchema = new mongoose.Schema({
  webid: String,
  idProducto: Number,
  nombreProducto: String,
  cantidad: Number,
  precio: Number,
  almacen: String,
  envio: Number,
  estado: String
})

const Pedido = mongoose.model("pedidos", pedidoSchema);

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

api.get("/productos",
  async (req: Request, res: Response): Promise<Response> => { 
    const productos = await Producto.find()
    return res.status(200).send(productos);
  }
);

api.get("/productos/:id",
  async (req: Request, res: Response): Promise<Response> => { 
    let productos;
    try {
    productos = await Producto.findOne({id:req.params.id})
    } catch {

    }
    return res.status(200).send(productos);
  }
);


export default api;