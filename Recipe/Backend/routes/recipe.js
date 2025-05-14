const express = require('express');
const {getRecipes,getRecipe,addRecipes,editRecipes,deleteRecipes}  = require("../controller/recipe");
const router = express.Router();

router.get("/",getRecipes)//get all recipes
router.get("/:id",getRecipe);//get recipe by id
router.post("/",addRecipes);//add recipe
router.put("/:id",editRecipes);//edit recipe
router.delete("/:id",deleteRecipes);//delete recipe

module.exports = router;