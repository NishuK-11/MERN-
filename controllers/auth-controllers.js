// // "action" is the description of what you want to do, while "dispatch" is the function that carries out that action

// in an express.js application, a "controller" refers to a part of your code thta is 
// responsible for handling the application's logic. controllers are typically used to process incoming requests, interact with models(data sources)
// , and send responses back to clients. they help organize your application by separating 
// concerns and following the MVC(model-view-controller) design Pattern.

const home = async(req,res) =>{
try{
    res.status(200).send("welcome to my world");
}catch(error){
    console.log("error found");
}
}

const register = async (req,res)=>{
    try{
        // console.log(req.body);
        const {username,email,phone,password} = req.body;

        const userExist = User
        // res.status(200).send('never cry for someone, they are not god');
        res.status(200).json({message:req.body});       
    }catch(error){
        res.status(500).json("internal server error");
    }
}
module.exports ={home,register};

