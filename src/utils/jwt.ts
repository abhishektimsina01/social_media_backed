import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const sign = (data : any) => {
    console.log(data)
    const token = jwt.sign(data, process.env.secret_key, {expiresIn : "1d"})
    console.log(token)
    return token
}

const verify = (token : any) => {
    console.log(token)
    const data = jwt.verify(token, process.env.secret_key)
    console.log(data)
    return data
}
export {sign, verify} 