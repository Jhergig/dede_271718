import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 

const app: Application = express();
const port: number = 5000;

const mongoose = require('mongoose');

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors(options));
app.use(bp.json());

app.use("/api", api)

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

mongoose.connect('mongodb://admin:asw@ac-ndy3exa-shard-00-00.jzhk3ah.mongodb.net:27017,ac-ndy3exa-shard-00-01.jzhk3ah.mongodb.net:27017,ac-ndy3exa-shard-00-02.jzhk3ah.mongodb.net:27017/?ssl=true&replicaSet=atlas-mab3rk-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, async () => { console.log('conectado') }); 
