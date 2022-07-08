import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

import { deleteImage, imageUploader } from "../middlewares/imageHandler.js";


// get all products
const getAllProducts = asyncHandler( async (req,res)=>{
    try {

        const products = await Product.find()

        res.status(200).json({
            success:true,
            products
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
})

// create product 
const createProduct = asyncHandler(async (req, res) => {
    try {
        let { title, description, price, discount, shippingCharge } = req.body;
        const { img } = req.files;

        price = parseInt(price)
        discount = parseInt(discount)
        discount = price / 100 * discount
        let tax = 10
        let taxAmount = price / 100 * tax
        const image = []
        for (let j = 0; j < img.length; j++) {
            image.push({ imageCount: j + 1 })
        }

        const productData = {
            title,
            description,
            price,
            discount,
            shippingCharge,
            MRP: price + taxAmount,
            productImages: image
        }

        const result = await Product.create(productData)

        for (let i = 0; i < img.length; i++) {
            imageUploader(req.files.img[i], result.productImages[i]._id)
        }

        res.status(200).json({
            success: true,
            result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
})


// edit product
const editProduct = asyncHandler(async (req, res) => {
    try {
        let { title, description, price, discount, shippingCharge, imageCount } = req.body;
        price = parseInt(price)
        discount = parseInt(discount)
        shippingCharge = parseInt(shippingCharge)
        const product = await Product.findById(req.params.productId)

        if (!product) return res.status(404).json({
            success: false,
            message: "Product not found !"
        })

        let tax = 10
        let taxAmount = price / 100 * tax

        if(req.files?.img){
            let [img] = product.productImages.filter((data) => data.imageCount == imageCount)
            await deleteImage(img._id, res)
            imageUploader(req.files.img, img._id)
        }

            product.title = title ? title : product.title,
            product.description = description ? description : product.description,
            product.price = price ? price : product.price,
            product.shippingCharge = shippingCharge ? shippingCharge : product.shippingCharge,
            product.MRP = price ? price + taxAmount : product.MRP,
            await product.save()

        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
})

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found !"
            })
        }

        product.productImages.map(async (img) => {
            await deleteImage(img._id, res)
        })

        await product.remove()
        res.status(200).json({
            success: true,
            message: "Product Deleted successfully !"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
})


export {getAllProducts, createProduct, editProduct, deleteProduct };