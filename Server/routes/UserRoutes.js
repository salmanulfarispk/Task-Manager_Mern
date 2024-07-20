import express from "express"
import {getNotification, getTeamList, LoginUser, Logout, RegisterUser} from "../controllers/UserController.js"
import {ProtectRoute,isAdminRoute} from "../middlewares/authMiddleware.js"

const router=express.Router()

router
.post("/register",RegisterUser)
.post("/login",LoginUser)
.post("/logout",Logout)


.get("getAllteamlist",ProtectRoute,isAdminRoute,getTeamList)  //only works for Admin
.get("getNotification",ProtectRoute,getNotification)






export default router

