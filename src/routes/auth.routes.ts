import express from "express"
import { authLogin, authLogout, authSignin } from "../controllers/auth.controller.js"
import { authentication } from "../middleware/authentication.js"
import { authorization } from "../middleware/authorization.js"

export const authRouter = express.Router()

authRouter.post("/login", authentication, authorization("all"), authLogin)
authRouter.post("/signin",authentication, authorization("all"), authSignin)
authRouter.get("/logout", authorization("user", "admin", "superadmin"), authLogout)