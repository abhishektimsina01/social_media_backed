import { logIn, signUp } from "../interface/interface.js"
import { loginSchema, signupSchema } from "../validations/allValidation.js"
import { AppDataSource } from "../database/DataSource.js"
import { ApiError } from "../interface/error.interface.js"
import {sign} from "../utils/jwt.utils.js"
import { comparePassword, hashPassword } from "../utils/password.utils.js"
import Profiles from "../database/Entity/profile.entity.js"

export const authLoginService = async(data : logIn) => {
    try{
        const {error} = loginSchema.validate(data)
        if(error){
            throw(error)
        }
        //check the gmail if already exist or not
        const profileRepo = AppDataSource.getRepository(Profiles)
        const user = await profileRepo.findOne({where : {gmail : data.gmail}})
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
        const profileRepo = AppDataSource.getRepository(Profiles)
        const user = await profileRepo.findOne({
            where : {gmail : data.gmail}
        })
        console.log(user)
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
        const newUser = profileRepo.create(data)
        const response = await profileRepo.save(newUser)
        console.log(`created user ${response}`)

        //after the user is saved we need to make accessToken for the user
        const token = sign({ id : response.user_id, gmail : response.gmail})
        return {ress : {
            id : response.user_id,
            username : response.username,
            gmail : response.gmail
        }, token : token}
    }
    catch(err){
        throw err
    }
}