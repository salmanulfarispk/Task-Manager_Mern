import express from "express"
const router=express.Router()
import { createTask, DuplicateTask ,PostActivityTask,CreateSubTask,UpdateTask,
    DashboardStatics,getTaskss,getTask,trashTask} from "../controllers/TaskController.js"
import {isAdminRoute, ProtectRoute} from "../middlewares/authMiddleware.js"





router.post("/createTask",ProtectRoute,isAdminRoute,createTask)
router.post("/duplicate/:id",ProtectRoute,isAdminRoute,DuplicateTask)
router.post("/activity/:id",ProtectRoute,PostActivityTask)


router.get("/dashboard",ProtectRoute,DashboardStatics)
router.get("/",ProtectRoute,getTaskss)
router.get("/:id",ProtectRoute,getTask)

router.post("/create-subtask/:id",ProtectRoute,isAdminRoute,CreateSubTask)
router.put("update-task/:id",ProtectRoute,isAdminRoute,UpdateTask)
router.patch("/:id",ProtectRoute,isAdminRoute,trashTask)













export default router

