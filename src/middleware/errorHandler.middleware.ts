import { NextFunction, Request, Response } from "express";
import { ApiError } from "../interface/error.interface.js";

const notFound = (req: Request, res : Response, next : NextFunction) => {
    try{

        const err = new Error(`${req.method} method for ${req.originalUrl} is not found`)
        throw err
    }
    catch(err){
        next(err)
    }
}

const errorHandler = (err : Error | ApiError, req : Request, res : Response, next : NextFunction) => {
    if(err instanceof Error){
        res.json({
            message : err.message,
            status : 404
        })
    }
    else{
        res.json({
            message : err.message,
            status : err.status
        })
    }
}