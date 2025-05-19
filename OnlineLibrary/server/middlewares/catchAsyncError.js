export const catchAsyncErrors = (theFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(theFunction(req,res,next)).catch(next)
    }
}

// async function exampleAsync() {
//   return "Hello";
// }//Calling exampleAsync() returns a Promise that resolves to "Hello".

