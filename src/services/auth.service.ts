import { logIn, signUp } from "../interface/interface.js"
import { loginSchema, signupSchema } from "../validations/allValidation.js"
import { ApiError } from "../interface/error.interface.js"
import {sign} from "../utils/jwt.utils.js"
import { comparePassword, hashPassword } from "../utils/password.utils.js"
import {ProfileRepository} from "../repository/profile.repository.js"

const profile = new ProfileRepository()

export const authLoginService = async(data : logIn) => {
    try{
        const {error} = loginSchema.validate(data)
        if(error){
            throw(error)
        }
        const user = await profile.findUserByEmail(data.gmail)
        console.log("user is", user)
        if(!user){
            const err : ApiError = {
                name : "Bad Request",
                message : "no user with the gmail account exist", 
                status : 400
            }
            throw err
        }
        //check the password for the gmail found`
        const hashedPassword = await comparePassword(data.password, user.password)
        if(!hashedPassword){
            const err : ApiError = {
                name : "Gmail or Password wrong",
                message : "your entered gmail or password is wrong",
                status : 404
            }
            throw err
        }
        //now as the user is authenitcated, we sent the jwt to user with cookie
        const token = sign({id : user.user_id, gmail : user.gmail, role : user.role})
        console.log(token)
        return {token : token}
    }
    catch(error){
        throw error
    }
}

export const authSignUpService = async(data : signUp) => {
    try{
        const {error} = signupSchema.validate(data)
        if(error){
            throw error
        }
        //check if there is any gmail account related to it
        const user = await profile.findUserByEmail(data.gmail)
        if(user){
            const err = {
                name : "Already used gmail",
                message : "The gamil account is already in use",
                status : 400
            }
            throw err
        }
        //if no user then first of all hash the password
        const hashedPassword = await hashPassword(data.password)
        data.password = hashedPassword
        //save the user
        const created_user = await profile.createUser(data)
        //after the user is saved we need to make accessToken for the user
        const response = {
            id : created_user.user_id,
            gmail : created_user.gmail,
            role : created_user.role
        }
        const token = sign(response)
        return {res : response, token : token}
    }
    catch(err){
        throw err
    }
}