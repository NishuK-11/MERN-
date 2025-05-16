// const mongoose = require('mongoose');

// const editedSchema = new mongoose.Schema({
//     title:{
//         "type":String,
//         "required":true,
//     },
//     editedIngredients:{
//         "type":String,
//         "required":true,
//     },
//     editInstructions:{
//         "type":String,
//         "required":true,
//     },
//     editTime:{
//         "type":String,
//         "required":true,
//     }
// })
// module.exports = mongoose.model("editRecipes",editedSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
