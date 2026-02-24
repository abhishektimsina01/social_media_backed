// deactivate option both my the user and the admin is allowed
// edit own credentials
// follows (i follow or unfollow)
// own post (see own post)
// pages followed
// comments made by myself
import { NextFunction, Request } from "express";
import { getProfileService } from "../services/profile.service.js";

export const getProfile = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const data = await getProfileService(req.user)
        console.log(data)
    }
    catch(err){
        next(err)
    }
}