// deactivate
// edit
// follows
// own post
// pages followed

import { NextFunction, Request } from "express";
import { getProfileService } from "../services/profile.service.js";


// comments made
export const getProfile = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const response = await getProfileService(req.user)
        console.log(response)
        res.json()
    }
    catch(err){
        next(err)
    }
}