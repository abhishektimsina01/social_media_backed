// post as user
// post as page
import { NextFunction, Request, Response } from "express";
import { post } from "../interface/interface.js";
import { createPostSerive, deletePostService, editPostService } from "../services/post.service.js";

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

// view likes (based on reaction)

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

// like post

