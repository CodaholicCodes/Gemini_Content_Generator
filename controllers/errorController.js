exports.getError=(req,res,next)=>{
console.log("Request Recieved : ",req);
    res.status(404).json({message : "Page not found"});
}
