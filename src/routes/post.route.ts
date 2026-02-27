import express from "express"
import { authentication } from "../middleware/authentication.js"
import { authorization } from "../middleware/authorization.js"
import { addComment, createPost, editPost, likePost, removePost } from "../controllers/post.controller.js"

const postRouter = express.Router()

// `postRouter.get("/getAllOwnPost")
// postRouter.get("/getAllOtherPost")
// postRouter.get("/getOnePost/:post_id")
postRouter.delete("/deletePost/:post_id",authentication, authorization("user"), removePost)
postRouter.patch("/editPost/:post_id", authentication, authorization("user"), editPost)
postRouter.post("/likePost/:postId", authentication, authorization("user"), likePost)
postRouter.post("/createPost", authentication, authorization("user"), createPost)
postRouter.post("/addComment/:postId", authentication, authorization("user"), addComment)

export {postRouter}