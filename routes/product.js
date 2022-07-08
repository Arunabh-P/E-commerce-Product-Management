import express from "express";
import { createProduct, editProduct, deleteProduct, getAllProducts } from "../controllers/product.js";
const router = express.Router();

router.route('/getAllProducts').get(getAllProducts)
router.route('/createProduct').post(createProduct)
router.route('/editProduct/:productId').put(editProduct)
router.route('/deleteProduct/:productId').delete(deleteProduct)

export default router;
