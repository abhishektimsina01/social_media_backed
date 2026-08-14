import express, { Request, Response } from "express"
import { authLogin, authLogout, authSigniUp } from "../controllers/auth.controller.js"
import { authentication } from "../middleware/authentication.js"
import { authorization } from "../middleware/authorization.js"
import { ProfileRepository } from "../repository/profile.repository.js"

export const authRouter = express.Router()

const profile = new ProfileRepository()

authRouter.post("/login", authLogin)
authRouter.post("/signup", authSigniUp)
authRouter.delete("/deleteUser", async (req :Request, res : Response) => {
    await profile.deleteUsers()
    res.json({
        "message" : "abhishek timsina"
    }) 
})
authRouter.get("/logout", authentication, authorization("user", "admin", "superadmin"), authLogout)