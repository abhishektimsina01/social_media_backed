import express from "express"
import http from "http"
import {Server} from "socket.io"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import {Application } from "express"

dotenv.config()

const app : Application = express()
const server = http.createServer(app)
const io = new Server(server)

io.use((socket, next) => {
    console.log("socket in middleware")
    next()
})

io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        console.log("socket disconnected")
    })
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// app.use("/api/auth", )
// app.use("/api/profile")
// app.use("/api/post")
// app.use("/api/comment")
// app.use("/api/post")
// app.use("/api/notify")


export default server