import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"


dotenv.config()



const PORT= process.env.PORT || 5000

const app=express()

