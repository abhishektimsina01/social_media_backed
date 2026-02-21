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

const errorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
        res.status(err?.status ?? 404).json({
            message : err.message,
            status : err?.status ?? 404
        })
}

export {notFound, errorHandler}