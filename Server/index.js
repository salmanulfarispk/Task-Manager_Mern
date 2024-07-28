import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import { DBconnection } from "./utils/Dbconnects.js"
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js"
import routes from "./routes/index.js"



dotenv.config()

DBconnection()

const PORT= process.env.PORT || 5000

const app=express()

app.use(cors({
    origin: ["http://localhost:3009","http://localhost:3000"],
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(morgan("dev"))  //The 'dev' format is optimized for development purposes.


app.use("/api", routes)

app.use(routeNotFound)
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})
