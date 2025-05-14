const express = require('express');
const router2 = express.Router();

router2.get("/wish",(req,res)=>{
    res.json({message:"good morning maa'am"})
})
module.exports = router2;