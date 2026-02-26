import express from "express"
import { authentication } from "../middleware/authentication.js"
import { authorization } from "../middleware/authorization.js"
import { createPost, editPost, removePost } from "../controllers/post.controller.js"
import { followProfile } from "../controllers/user.controller.js"

const postRouter = express.Router()

// `postRouter.get("/getAllOwnPost")
// postRouter.get("/getAllOtherPost")
// postRouter.get("/getOnePost/:post_id")
postRouter.delete("/deletePost/:post_id",authentication, authorization("user"), removePost)
postRouter.patch("/editPost/:post_id", authentication, authorization("user"), editPost)
// postRouter.get("/likePost/:post_id")`
postRouter.post("/createPost", authentication, authorization("user"), createPost)
postRouter.get("/followProfile/:userId", authentication, authorization("user"), followProfile)

export {postRouter}