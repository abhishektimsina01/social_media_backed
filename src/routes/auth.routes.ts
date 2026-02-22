import express from "express"
import { authLogin, authLogout, authSigniUp } from "../controllers/auth.controller.js"
import { authentication } from "../middleware/authentication.js"
import { authorization } from "../middleware/authorization.js"

export const authRouter = express.Router()

authRouter.post("/login", authLogin)
authRouter.post("/signup", authSigniUp)
authRouter.get("/logout", authentication, authorization("user", "admin", "superadmin"), authLogout)