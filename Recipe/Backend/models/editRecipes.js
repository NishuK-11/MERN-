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

const editedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    editedIngredients: {
        type: String,
        required: true
    },
    editInstructions: {
        type: String,
        required: true
    },
    editTime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("editRecipes", editedSchema);
