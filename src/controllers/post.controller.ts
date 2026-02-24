// post as user
// post as page
import { NextFunction, Request, Response } from "express";
import { post } from "../interface/interface.js";
import { createPostSerive, deletePostService } from "../services/post.service.js";
import { number } from "joi";

export const createPost = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const data : post = req.body
        const response = await createPostSerive(data, req.user)
        console.log(response)
        res.json({
            success : true,
            status : 200,
            response : response
        })
    }
    catch(err){
        next(err)
    }
}

export const removePost = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const response = await deletePostService(Number(req.params.post_id), req.user)
        res.json({
            success : true,
            name : "Post Removed",
            message : "Post was remove from the database"
        })
    }
    catch(err){
        throw err
    }
}

// view likes (based on reaction)

// remove post

// edit post

// like post

