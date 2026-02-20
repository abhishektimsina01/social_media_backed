import { NextFunction, Request, Response } from "express"
import { ApiError } from "../interface/error.interface.js"

const authorization = (...roles : string[]) => {
    return (req : Request, res : Response, next : NextFunction)=>{
        if(roles.includes("all") || roles.includes("user")){
            next()
        }
        else{
            const err : ApiError = {
                name : "Unauthorized",
                message : `Unauthorized to ${req.originalUrl}`,
                status : 402
            }
            next(err)
        }
    }
}

export {authorization}