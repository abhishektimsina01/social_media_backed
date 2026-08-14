import { Express } from "express"
import express from "express"
import { AppDataSource } from "./database/DataSource.js"
import { appConfiguration } from "./app.js"
import { start } from "node:repl"
import dotenv from "dotenv"
import { fetch } from "./utils/env.utils.js"
dotenv.config()

const startServer = async () : Promise<void> => {
    const app : Express = express()
    AppDataSource.initialize().then(() => {
        console.log("database connected successfully✅")
        appConfiguration(app)
        app.listen(fetch("port"), (err) => {
            if(err){
                console.log("error has occurred")
            }
            else{
                console.log("server has started successfully✅")
            }
        })
    })
    .catch((err) => {
        console.log("database couldnot connect successfully❌")
    })
}

startServer()