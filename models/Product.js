import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [4, 'At least 4 characters required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    MRP: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    shippingCharge : {
        type:Number
    },
    productImages: [
        {
            image:String,
            imageCount:Number
        }
    ],
    

});

export default mongoose.model("Product", productSchema);