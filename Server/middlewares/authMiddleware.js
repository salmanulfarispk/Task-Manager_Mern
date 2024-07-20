import jwt from "jsonwebtoken"
import User from "../models/User.js"



const ProtectRoute = async(req,res, next)=>{
    try {
        
        let token = req.cookies.token;

        if(token){
            const decodedToken=  jwt.verify(token,process.env.JWT_SECRET)

            const resp= await User.findById(decodedToken.userId).select("isAdmin email")//only we need is isAdmin and email and when generates token using _id as userId

            req.user={
                email: resp.email,
                isAdmin: resp.isAdmin,
                userId: decodedToken.userId,
            }

            next();  // Call the next middleware or route handler
        }else{

            return res.status(401).json({
                status: false,
                messsage: "Not authorized. Try login again." 
            })

        }
    } catch (error) {
         console.log("error",error);
         return res
         .status(401)
         .json({ status: false, message: "Not authorized. Try login again." });
    }
};


const isAdminRoute =async(req,res, next)=>{
    if(req.user && req.user.isAdmin){  //isAdmin as true this works
        next()
    }else{
        return res.status(401).json({
            status: false,
            message: "Not authorized as admin. Try login as admin.",
        })
    }
};




export {ProtectRoute,isAdminRoute}