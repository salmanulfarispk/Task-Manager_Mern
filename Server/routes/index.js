import express from "express"
import userRoute from "./UserRoutes.js"
import TaskRoute from "./TaskRoutes.js"


const router=express.Router()


router.use("/user",userRoute)
router.use("/task",TaskRoute)


export default router


