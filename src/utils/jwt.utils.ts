import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { fetch } from "./env.utils.js"
dotenv.config()

const sign = (data : any) => {
    console.log(data)
    const secret_key = fetch('secret_key')
    if(!secret_key){
        const error = new Error("Secret key not found")
        return error
    }
    const token = jwt.sign(data, secret_key, {expiresIn : "1d"})
    console.log(token)
    return token
}

const verify = (token : string) => {
    // there can be various kind of error like, exipre, invalid or notfound
    try{
        console.log(token)
        const secret_key = fetch('secret_key')
        if(!secret_key){
            const error = new Error("Secret key not found")
            return error
        }
        const data = jwt.verify(token, secret_key)
        console.log(data)
        return data
    }
    catch(err){
        return err
    }
}

export {sign, verify} 