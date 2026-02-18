import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { Request, Response, Application } from "express"

dotenv.config()

const app : Application = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
// app.use("/api/auth", )
// app.use("/api/profile")
// app.use("/api/post")
// app.use("/api/comment")
// app.use("/api/post")
// app.use("/api/notify")


export default app