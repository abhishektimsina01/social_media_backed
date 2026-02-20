// login
// logout
// signin

import { NextFunction, Request, Response } from "express";
import { ApiError } from "../interface/error.interface.js";
import { login, signUp } from "../interface/login.interface.js";
import { loginSchema } from "../validations/allValidation.js";
import { AppDataSource } from "../database/DataSource.js";
import { comparePassword } from "../utils/password.utils.js";
import { sign } from "../utils/jwt.utils.js";


const authLogin = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const data : login = req.body
        const {error} = loginSchema.validate(data)
        if(error){
            next(error)
        }
        //check the gmail if already exist or not
        const profileRepo = AppDataSource.getRepository("Profile")
        const user = await profileRepo.findOne({where : {gmail : req.body.gmail}})
        if(!user){
            const err : ApiError = {
                name : "Bad Request",
                message : "user with the gmail account already exist", 
                status : 400
            }
            throw err
        }
        //check the password for the gmail found
        const hashedPassword = await comparePassword(req.body.password, user.password)
        if(!hashedPassword){
            const err : ApiError = {
                name : "Gmail or Password wrong",
                message : "your entered gmail or password is wrong",
                status : 404
            }
            throw err
        }
        //now as the user is authenitcated, we sent the jwt to user with cookie
        const token = sign({id : user.id, gmail : user.gmail})
        res.cookie("accessToken", token, {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 24 * 60 * 60
        }).json({
            success : true,
            message : "Logged-in",
            status : 200
        })
    }
    catch(err : any){
        next(err)
    } 
}

const authSignin = (req : Request, res : Response, next :NextFunction) => {
    try{
        const data : signUp = req.body
        console
    }
    catch(err){
        next(err)
    }
}

const authLogout = (req : Request, res : Response, next : NextFunction) => {
    // 
}

export {authLogin, authSignin, authLogout}