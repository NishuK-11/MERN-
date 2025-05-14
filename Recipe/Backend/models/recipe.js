// const mongoose = require('mongoose');

// const recipeSchema = mongoose.SchemaTypes({
//     title:{
//         type:String,
//         required:true
//     },
//     ingredients:{
//         type:String,
//         required:true
//     },
//     instructions:{
//         type:String,
//         required:true
//     },
//     time:{
//         type:String,
//     },
//     coverImage:{
//         type:String,
//     },
// },{timestamps:true});

// module.exports = mongoose.model("Recipes",recipeSchema);
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time: {
        type: String,
    },
    coverImage: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);

