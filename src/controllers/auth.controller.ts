import { NextFunction, Request, Response } from "express";
import { logIn, signUp } from "../interface/login.interface.js";
import { authLoginService, authSignUpService } from "../services/auth.service.js";


const authLogin = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const data : logIn = req.body
        const {token} = await authLoginService(data)
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

const authSigniUp = async(req : Request, res : Response, next :NextFunction) => {
    try{
        const data : signUp = req.body
        const response = await authSignUpService(data)
        res.cookie("accessToken", response?.token, {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 24 * 60 * 60
        }).json({
            success : true,
            message : "Signed Up",
            status : 200
        })
    }
    catch(err){
        next(err)
    }
}

const authLogout = async(req : Request, res : Response, next : NextFunction) => {
    try{
        //for logout we need to find the token
        const token = req.cookies.accessToken
        console.log(token)
        res.clearCookie("accessToken").json({
            success : false,
            message : "Logged Out",
            status : 200
        })
    }
    catch(err){

        next(err)
    }
}

export {authLogin, authSigniUp, authLogout}