
// const Recipes = require("../models/recipe");
// const EditRecipes = require("../models/editRecipes"); // Capitalized for convention

// const getRecipes = (req, res) => {
//     res.json({ message: "sonam is the best" });
// };

// const addRecipes = async (req, res) => {
//     const { title, ingredients, instructions, time } = req.body;

//     if (!title || !ingredients || !instructions) {
//         return res.json({ message: "Required fields can't be empty" });
//     }

//     const newRecipe = await Recipes.create({
//         title,
//         ingredients,
//         instructions,
//         time
//     });

//     return res.json(newRecipe);
// };

// const editRecipes = async (req, res) => {
//     const { title, editedIngredients, editInstructions, editTime } = req.body;

//     if (!title || !editedIngredients || !editInstructions || !editTime) {
//         return res.json({ message: "Required fields can't be empty" });
//     }

//     const newEdit = await EditRecipes.create({
//         title,
//         editedIngredients,
//         editInstructions,
//         editTime
//     });

//     return res.json(newEdit);
// };

// const deleteRecipes = (req, res) => {
//     res.json({ message: "bhaiya is the best" });
// };

// module.exports = { getRecipes, addRecipes, editRecipes, deleteRecipes };


//method 2:-

const Recipes = require("../models/recipe");
const EditRecipes = require("../models/editRecipes"); // Capitalized for convention

const getRecipes = async (req, res) => {
    const recipes = await Recipes.find();
    return res.json(recipes);
};
const getRecipe = async (req, res) => {
    const recipe = await Recipes.findById(req.params.id);
   
    return res.json(recipe);
};

const addRecipes = async (req, res) => {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
        return res.json({ message: "Required fields can't be empty" });
    }

    const newRecipe = await Recipes.create({
        title,
        ingredients,
        instructions,
        time
    });

    return res.json(newRecipe);
};

// const editRecipes = async (req, res) => {
//     const { id } = req.params;
//     const { title, editedIngredients, editInstructions, editTime } = req.body;

//     if (!title || !editedIngredients || !editInstructions || !editTime) {
//         return res.status(400).json({ message: "Required fields can't be empty" });
//     }

//     try {
//         const updatedRecipe = await Recipes.findByIdAndUpdate(
//             id,
//             {
//                 title,
//                 ingredients: editedIngredients,
//                 instructions: editInstructions,
//                 time: editTime
//             },
//             { new: true }
//         );

//         if (!updatedRecipe) {
//             return res.status(404).json({ message: "Recipe not found" });
//         }

//         return res.json(updatedRecipe);
//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong", error: error.message });
//     }
// };

const editRecipes = async(req,res)=>{
    const {title,ingredients,instructions,time} = req.body 
    let recipe = await Recipes.findById(req.params.id);
    try{
        if(recipe){
        await Recipes.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
        return res.status(404).json({message:"error"});
    }
}


const deleteRecipes = (req, res) => {
    res.json({ message: "bhaiya is the best" });
};

module.exports = { getRecipes, getRecipe,addRecipes, editRecipes, deleteRecipes };
