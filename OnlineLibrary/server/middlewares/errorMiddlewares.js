// class Error{
//     constructor(message){
//         this.message = message;
//     }
// }
// throw new Error("This is an error message");

class ErrorHandler extends Error{
    //message Error class se aa rha hai , statusCode khud ka hai(Errorhandler)
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}
//agr do do export lge ho to kaise pta chlega ki "err,req,res" kiska hai? 

export const errorMiddleware = (err, req,res,next) =>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode ||500;
    console.log(err)

    // Handle duplicate key errors (e.g., duplicate email in MongoDB)
    if(err.code ===11000){
        const statusCode = 400;
        const message = `Duplicate Field Value Entered`;
        err = new ErrorHandler(message,statusCode)
    }
    //// Handle JWT errors: invalid token
    if(err.name ==="JsonWebTokenError"){
        const statusCode = 400;
        const message = `Json web Token is invalid. Try again`;
        err = new ErrorHandler(message,statusCode)
    }
    if(err.name ==="TokenExpiredError"){
        const statusCode = 400;
        const message = `Json web Token is expired. Try again`;
        err = new ErrorHandler(message,statusCode)
    }
    if(err.name === 'CastError'){
        const statusCode = 400
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,statusCode)
    }
    const errorMessage = err.errors
    ?Object.values(err.errors)
    .map(error=>error.message)
    .join(" ")
    :err.message;

    return res.status(err.statusCode).json({
        success:false,
        message:errorMessage,
    })
};
export default ErrorHandler