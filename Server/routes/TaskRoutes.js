import express from "express"
const router=express.Router()
import { createTask, DuplicateTask ,PostActivityTask} from "../controllers/TaskController.js"
import {isAdminRoute, ProtectRoute} from "../middlewares/authMiddleware.js"





router.post("/createTask",ProtectRoute,isAdminRoute,createTask)
router.post("/duplicate/:id",ProtectRoute,isAdminRoute,DuplicateTask)
router.post("/activity/:id",ProtectRoute,PostActivityTask)




export default router

