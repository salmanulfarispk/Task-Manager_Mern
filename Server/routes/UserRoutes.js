import express from "express"
import {LoginUser, Logout, RegisterUser} from "../controllers/UserController.js"

const router=express.Router()

router
.post("/register",RegisterUser)
.post("/login",LoginUser)
.post("/logout",Logout)





export default router

