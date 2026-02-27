// post as user
// post as page
import { NextFunction, Request, Response } from "express";
import { post } from "../interface/interface.js";
import { createPostSerive, deletePostService, editPostService, likePostServices } from "../services/post.service.js";

export const createPost = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const data : post = req.body
        const response = await createPostSerive(data, req.user)
        console.log(response)
        res.json({
            success : true,
            status : 200,
            response : {
                content : response.content,
                feeling : response.feeling,
                tagged : response.profiles
            }
        })
    }
    catch(err){
        next(err)
    }
}

export const removePost = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const response = await deletePostService(Number(req.params.post_id), req.user)
        res.json(response)
    }
    catch(err){
        throw err
    }
}

// edit post
export const editPost = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const postId = req.params?.post_id
        const response = await editPostService(Number(postId), req.body)
        console.log(response)
        res.json({
            success : true
        })
    }
    catch(err){
        next(err)
    }
}

export const likePost = async(req : Request, res : Response, next : NextFunction) => {
    try{ 
        console.log(req.params.postId)
        const response = await likePostServices(Number(req.params.postId), req.user)
        res.json({
            success : true, 
            message : "the user liked the post",
            name : "liked"
        })
    }
    catch(err){
        next(err)
    }
}