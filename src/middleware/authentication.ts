import { Request, Response, NextFunction } from "express"
import { verify } from "../utils/jwt.utils.js"
import { User } from "../interface/interface.js"
import { AppDataSource } from "../database/DataSource.js"
import Profiles from "../database/Entity/profile.entity.js"

const authentication = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const token = req.cookies?.accessToken ?? null
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
        req.user = data
        if(!req.user){
            const err = new Error("nothing in req.user")
            throw err
        }
        console.log(req.user)
        console.log("authenticatipon finished")
        next()
    }
    catch(err){
        next(err)
    }
}

export {authentication}