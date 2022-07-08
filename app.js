import express from "express";
import fileUpload from "express-fileupload";
const app = express();

import dotenv from "dotenv";
dotenv.config({path:"./config/config.env"});

//using middlewares
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:true}));
app.use(fileUpload())

//importing routes
import product from "./routes/product.js"

//using routes
app.use("/api/v1", product)

export default app;