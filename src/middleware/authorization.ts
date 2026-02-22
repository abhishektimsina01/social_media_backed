import { NextFunction, Request, Response } from "express"
import { ApiError } from "../interface/error.interface.js"

const authorization = (...roles : string[]) => {
    return (req : Request, res : Response, next : NextFunction)=>{
        console.log("authorization started")
        console.log(roles)
        console.log(req.user.role)
        if(roles.includes("all") || roles.includes(req.user.role)){
            console.log("authorization finished")
            return next()
        }
        else{
            const err : ApiError = {
                name : "Unauthorized",
                message : `Unauthorized to ${req.originalUrl}`,
                status : 402
            }
            return next(err)
        }
    }
}

export {authorization}