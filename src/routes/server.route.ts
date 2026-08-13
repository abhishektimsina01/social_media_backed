import { authRouter } from "../routes/auth.routes.js"
import { errorHandler, notFound } from "../middleware/errorHandler.middleware.js"
import { postRouter } from "../routes/post.route.js"
import { profileRouter } from "../routes/user.route.js"
import { Application } from "express"


export const RoutesRegistration  = (app : Application) => {
    app.use("/api/auth", authRouter)
    app.use("/api/profile", profileRouter)
    app.use("/api/post", postRouter)
    // app.use("/api/comment")
    // app.use("/api/post")
    // app.use("/api/notify")

    // error handler
    app.use(notFound)
    app.use(errorHandler)
}