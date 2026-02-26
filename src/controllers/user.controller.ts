// deactivate option both my the user and the admin is allowed
// edit own credentials
// follows (i follow or unfollow)
// pages followed
// comments made by myself
import { NextFunction, Request, Response } from "express";
import { followProfileServices, getProfileService } from "../services/profile.service.js";

export const getProfile = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const data = await getProfileService(req.user)
        console.log(data)
        res.json(data)
    }
    catch(err){
        next(err)
    }
}

export const followProfile = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const userId = req.params.userId
        const response = await followProfileServices(Number(userId))
        console.log(response)
        res.json({
            success : true, 
            name : "started following"
        })
    }
    catch(err){
        next(err)
    }
}