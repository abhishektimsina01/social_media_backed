import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { fetch } from "./env.utils.js"
import { User } from "../interface/interface.js"
import { Err } from "joi"
dotenv.config()

const sign = (data : User) => {
    console.log(data)
    const secret_key = fetch('secret_key')
    console.log(secret_key)
    if(!secret_key){
        const error = new Error("Secret key not found")
        return error
    }
    const token = jwt.sign(data, secret_key, {expiresIn : "1d"})
    console.log("the token is", token)
    return token
}

const verify = (token : string): User | Error => {
    // there can be various kind of error like, exipre, invalid or notfound
    try{
        const secret_key = fetch('secret_key')
        if(!secret_key){
            const error = new Error("Secret key not found")
            return error
        }
        const data = jwt.verify(token, secret_key) as User
        console.log("the token data is", data)
        return data
    }
    catch(err){
        throw err
    }
}

export {sign, verify} 