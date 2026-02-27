import express from "express"
import { authentication } from "../middleware/authentication.js"
import { authorization } from "../middleware/authorization.js"
import { followProfile, getProfile } from "../controllers/user.controller.js"

const profileRouter = express.Router()

profileRouter.get("/getProfile", authentication, authorization("user"), getProfile)
profileRouter.get("/followProfile/:userId", authentication, authorization("user"), followProfile)
export {profileRouter}