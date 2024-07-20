import express from "express"
import {LoginUser, RegisterUser} from "../controllers/UserController.js"

const router=express.Router()

router
.post("/register",RegisterUser)
.post("/login",LoginUser)




export default router

