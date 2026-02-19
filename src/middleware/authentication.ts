import { Request, Response, NextFunction } from "express"
import { verify } from "../utils/jwt.js"

const authentication = async(req : Request, res : Response, next : NextFunction) => {
    try{
        console.log(req.cookies)
        res.json(req.cookies)
    }
    catch(err){
        next(err)
    }
}

export {authentication}