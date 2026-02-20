import {v2 as Cloudinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

Cloudinary.config({
    cloud_name : "",
    api_key : "",
    api_secret : ""
    
})

export {Cloudinary}