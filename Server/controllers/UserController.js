import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createJWT } from "../utils/GenerateToken.js"
import Notification from "../models/notification.js"



export const RegisterUser = async (req, res) => {
    try {

        const { name, email, password, isAdmin, role, title } = req.body;

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({
                status: false,
                message: "User already exists",
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin,
            role,
            title
        })
        await user.save();


        if (user) {
            isAdmin ? createJWT(res, user._id) : null;

            user.password = undefined;

            return res.status(201).json(user)

        } else {
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


export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password."
            })
        }


        if (!user?.isActive) {
            return res.status(401).json({
                status: false,
                message: "User account has been deactivated, contact the administrator"
            })
        }


        const isMatchPass = await bcrypt.compare(password, user.password)

        if (user && isMatchPass) {
            createJWT(res, user._id)

            user.password = undefined;

            res.status(201).json(user)

        } else {
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

export const Logout = async (req, res) => {
    try {

        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({
            message: "Logout succusfull"
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}


export const getTeamList = async (req, res) => {
    try {
        const users = await User.find().select("name title role email isActive");

        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};



export const getNotification = async (req, res) => {
    try {

        const { userId } = req.user;

        const notification = await Notification.find({
            team: userId,                     // if i logined now,and it cheks with my userid thats inside team include or not.
            isRead: { $nin: [userId] }         //($not in) if iam in the team ,then it ensures that iam not includes in the isRead array,no userid in there means not readed,after clicks markasread button,then id added to that isread array
        }).populate("task", "title")           // then populate only title inside the task

        res.status(201).json(notification);

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const updateUserProfile = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user;
        const { _id } = req.body;  //updating id

        const id =
            isAdmin && userId === _id ? userId      //which means its admin,admin can update his profile.
                : isAdmin && userId !== _id ? _id   //which is admin ,but this time admin can update other users profile
                    : userId                         //Ensures non-admin users act only on their own records.

          
      const user= await User.findById(id)
        if(user){
          user.name = req.body.name || user.name;
          user.title = req.body.title || user.title;
          user.role = req.body.role || user.role;


          const updatedUser =await user.save();
           user.password = undefined;

           res.status(201).json({
            status: true,
            message: "Profile Updated Successfully.",
            user: updatedUser,
          });

        } else {
          res.status(404).json({ status: false, message: "User not found" });

        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const MarkAsNotification=async(req,res)=>{
    try {
        const {userId}=req.user;
        const {isReadType, id}=req.query;

        if(isReadType === "all"){
             await Notification.updateMany(
                { team: userId, isRead: {$nin: [userId]} }, //user is in team and also  not readed notific
                { $push: {isRead : userId} }                 //add userId to the isRead array
             )
        }else{
            await Notification.findOneAndUpdate(
                { _id: id, isRead:{$nin: [userId]}},
                { $push: {isRead : userId } },
                {new: true}
            )
        }

        res.status(201).json({
            status:true,
            message: "Done"
        })

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const ChangePassword=async(req,res)=>{
    try {

        const {userId}=req.user;
        const {password}=req.body;

        const user=await User.findById(userId);

        if(user){
            const hashedPassword= await bcrypt.hash(password,10)
            user.password= hashedPassword;
            await user.save()

            user.password=undefined;

            res.status(200).json({
                status: true,
                message: "Password changed successfully"
            })
        } else {
            res.status(404).json({ status: false, message: "User not found" });
          }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}

export const ActivateteUsers=async(req,res)=>{
    try {
      
        const {id}=req.params;

        const user=await User.findById(id)

        if(user){
             user.isActive= req.body.isActive;

             await user.save()

             res.status(200).json({
                status: true,
                message: `User account has been ${
                    user?.isActive ? "activated":"disabled"
                }`
             })
        }else {
            res.status(404).json({ status: false, message: "User not found" });
          }
  
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const DeleteUser=async(req,res)=>{
    try {

        const {id}=req.params;

           await User.findByIdAndDelete(id)

        res.status(200).json({
            status: true, 
            message: "User deleted successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}