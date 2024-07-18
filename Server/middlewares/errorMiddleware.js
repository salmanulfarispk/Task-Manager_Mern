

const routeNotFound =(req,res, next)=>{
    
    const error=  new Error(`Route not Found : ${req.originalUrl}`) //represents the original URL requested by the client. It includes the pathname and the query string of the URL that was requested.
    res.status(404);
    next(error)  //// Passes the error to the next middleware or error handler
}


const errorHandler =(err,req,res, next)=>{
    
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; //if shows as 200 means success then it shows 500 as error
    let message= err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {  //these errors in mongoose vales errors
        statusCode = 404;
        message = "Resource not found";
      }

      res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,  
      });
}

export { routeNotFound,errorHandler };