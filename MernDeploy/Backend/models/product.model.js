import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        require:true
    },
},{
    timestamps:true //createdAt  ,   updatedAt
//     You can track when a product/user/order was created

// Helpful for features like "Sort by newest", "Last updated", "Recently added"

// Works automatically – no need to manage dates manually
// {
//   "_id": "654321...",
//   "name": "iPhone 15",
//   "price": 799,
//   "createdAt": "2025-05-26T12:00:00Z",
//   "updatedAt": "2025-05-26T12:00:00Z",
//   "__v": 0
// }
// createdAt	When the document was created
// updatedAt	When the document was last updated
});

const Product = mongoose.model('Product',productSchema);

// mongoose.model("Product", ...):
// The first argument "Product" is the model name used internally by Mongoose

// It also defines the MongoDB collection name (automatically becomes products)

// 📦 const Product = ...:
// This is just a JavaScript variable

// You can name it whatever you want! But using the same name (capitalized model name) is a convention for clarity and consistency.

export default Product;