import { AppDataSource } from "../database/DataSource.js"
import Profiles from "../database/Entity/profile.entity.js"


export const getProfileService = async(data : {id : number, gmail : string, role : string}) => {
    try{
        const userRepo = AppDataSource.getRepository(Profiles)
        const profile = await userRepo.findOne({
            where : {user_id : data.id},
            relations : ["posts", "tagged_post", "posts.profiles"],
            select : {
                user_id : true,
                username : true,
                name : true,
                created_at : true,
                posts :{
                    post_id : true,
                    content : true,
                    profiles : {
                        user_id : true,
                        username : true
                    }
                }, 
                tagged_post : {
                    post_id : true,
                    content : true,
                    feeling : true
                }
            }
        })
        if(!profile){
            const err = {
                success : false, 
                name : "not found",
                message : "user not found"
            }
            throw err
        }
        console.log("the profile is", profile)
        return profile
    }
    catch(err){
        throw err
    }
}