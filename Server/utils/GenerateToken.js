import jwt from "jsonwebtoken"

export const createJWT = (res,userId)=>{

    const token=  jwt.sign({userId}, process.env.JWT_SECRET ,{  //using userid and secret for generates
        expiresIn: "1d"   
    }) ;

    
     res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", //now false ,only true when in productions or test
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
     })

}