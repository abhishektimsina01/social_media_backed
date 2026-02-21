import express from "express"
import { authentication } from "../middleware/authentication.js"
import { authorization } from "../middleware/authorization.js"
import { createPost } from "../controllers/post.controller.js"

const postRouter = express.Router()

// `postRouter.get("/getAllOwnPost")
// postRouter.get("/getAllOtherPost")
// postRouter.get("/getOnePost/:post_id")
// postRouter.get("/deletePost/:post_id")
// postRouter.patch("/editPost/:post_id")
// postRouter.get("/likePost/:post_id")`
postRouter.post("/createPost", authentication, authorization("user"), createPost)

export {postRouter}