// post as user
// post as page
import { NextFunction, Request, Response } from "express";
import { post } from "../interface/interface.js";
import { createPostSerive } from "../services/post.service.js";

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

// view likes (based on reaction)

// remove post

// edit post

// like post

