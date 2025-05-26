
import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    }catch(error){
        console.log("error in fetching products",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const createProduct =  async (req, res) => {
    const product = req.body;//user will send this data 

    if(!product.name || !product.price ||!product.image){
        return res.status(400).json({success:false,message:"Please provide all fields"})
    }
    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
    }catch(error){
        console.log("Error in Create Product :",error.message);
        res.status(500).json({success:false,message:"Server Error"})
    }
}

export const updateProduct = async(req,res)=>{
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
//         MongoDB ka ObjectId ek 24 characters ka unique ID hota hai.

// Agar user galat ID bhej de, jaise:
// /api/products/1234, to wo MongoDB me invalid hoga aur error aayega.
        //"Agar ID valid hi nahi hai, to database check hi mat karo. Seedha error bhej do."
//         🟡 Agar ID valid hai but product nahi mila, to 404 "Not Found"

// 🔴 Agar ID hi invalid hai, to 400 "Bad Request"

// 🔥 Agar koi coding ya server issue hua, to 500 "Server Error"
        return res.status(404).json({success:false,message:"Invalid Product ID"})
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true,data:updatedProduct});
    }catch(error){
       res.status(200).json({success:false,message:"Server Error"});
    }
}

export const deleteProduct = async(req,res)=>{
    const {id} = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product Id"});
    }
    console.log("id:",id);
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"})
    }catch(error){
        console.log("error in deleting product:",error.message);
        res.status(500).json({success:false,message:"Server Error"})
    }
}
