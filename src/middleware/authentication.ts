import { Request, Response, NextFunction } from "express"
import { verify } from "../utils/jwt.utils.js"

const authentication = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const token = req.cookies?.token ?? null
        if(!token){
            const err = new Error("no token found")
            throw err
        }
        // yedi token paiyo vhane, then verify the token
        const data = verify(token)
        if(data instanceof Error){
            throw data
        }
        // yedi sbaai kura fine xa vhane
        console.log(data)
        req.user = data
    }
    catch(err){
        next(err)
    }
}

export {authentication}