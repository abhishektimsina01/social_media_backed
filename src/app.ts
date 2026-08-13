import {Application } from "express"
import { Midlleware } from "./middleware/server.middleware.js"
import { RoutesRegistration } from "./routes/server.route.js"

export const appConfiguration = (app : Application) => {
    Midlleware(app)
    RoutesRegistration(app)
}
