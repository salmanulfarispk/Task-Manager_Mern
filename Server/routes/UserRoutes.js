import express from "express"
import {ActivateteUsers, ChangePassword, DeleteUser, getNotification, getTeamList, LoginUser, Logout, MarkAsNotification, RegisterUser, updateUserProfile} from "../controllers/UserController.js"
import {ProtectRoute,isAdminRoute} from "../middlewares/authMiddleware.js"

const router=express.Router()

router
.post("/register",RegisterUser)
.post("/login",LoginUser)
.post("/logout",Logout)


.get("getAllteamlist",ProtectRoute,isAdminRoute,getTeamList)  //only works for Admin
.get("getNotification",ProtectRoute,getNotification)
.put("/updateProfile",ProtectRoute,updateUserProfile)
.put("/mark-as-read",ProtectRoute,MarkAsNotification)
.patch("/change-Password",ProtectRoute,ChangePassword)


//Admin only

.patch("/:id",isAdminRoute,ActivateteUsers)
.delete("/:id",isAdminRoute,DeleteUser)





export default router

