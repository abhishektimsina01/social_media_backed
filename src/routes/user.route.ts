import express from "express"
import { authentication } from "../middleware/authentication.js"
import { authorization } from "../middleware/authorization.js"
import { getProfile } from "../controllers/user.controller.js"

const profileRouter = express.Router()

profileRouter.get("/getProfile", authentication, authorization("user"), getProfile)

export {profileRouter}