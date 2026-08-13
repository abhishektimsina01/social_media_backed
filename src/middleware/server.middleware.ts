import express, { Application } from "express"
import cookieParser from "cookie-parser"
import limiter from "../config/rateLimiting.js"


export const Midlleware = (app : Application) => {
    app.use(limiter)
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({extended : true}))
}