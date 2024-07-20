import User from "../models/User.js"
import  bcrypt from "bcryptjs"
import { createJWT }  from "../utils/GenerateToken.js"




 export const RegisterUser =async(req,res)=>{
    try {

        const {name,email,password, isAdmin, role,title}=req.body;

        const userExist =await User.findOne({email})

        if(userExist){
            return res.status(400).json({
                status: false,
                message: "User already exists",
            })
        }
        
        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)
         

        const user= await User.create({
            name,
            email,
            password:hashedPassword,
            isAdmin,
            role,
            title
        })
        await user.save();


         if(user){
            isAdmin ? createJWT(res, user._id) : null ;
              
            user.password=undefined;

            return res.status(201).json(user)

         } else{
            return res.status(400).json({
             status: false,
              message: "Invalid user data"
             });
         }
        
    } catch (error) {
        return res.status(400).json({
          status: false,
          message: error.message
        })
    }
 };


 export const LoginUser= async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user= await User.findOne({email})
        if(!user){
            return res.status(401).json({
                status: false,
                message: "Invalid email or password."
            })
        }

        if(!user?.isActive){
            return res.status(401).json({
                status: false,
                message: "User account has been deactivated, contact the administrator"
            })
        }

        const isMatchPass= await bcrypt.compare(user.password,password)

        if(user && isMatchPass){
            createJWT(res,user._id)

            user.password= undefined;

            res.status(201).json(user)

        }else {
            return res
              .status(401)
              .json({ status: false, message: "Invalid email or password" });
          }        
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
          })
    }
 }