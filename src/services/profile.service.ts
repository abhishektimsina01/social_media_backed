import { AppDataSource } from "../database/DataSource.js"
import { Followers } from "../database/Entity/followers.entity.js"
import Profiles from "../database/Entity/profile.entity.js"
import { User } from "../interface/interface.js"


export const getProfileService = async(data : User) => {
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
                posts : {
                    post_id : true,
                    content : true,
                    cretaed_at : true,
                    updated_at : true,
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


export const followProfileServices = async(userId : number, data : User) => {
    try{
        const followRepo = AppDataSource.getRepository(Followers)
        const userRepo = AppDataSource.getRepository(Profiles)
        const follower = await userRepo.findOne({
            where : { user_id : data.id},
            select : {
                user_id : true,
                username : true, 
                gmail : true
            }
        })
        
        const followedTo = await userRepo.findOne({
            where : {user_id : userId},
            select : {
                user_id : true,
                username : true,
                gmail : true
            }
        })

        if(!follower || !followedTo){
            const err = {
                success : false,
                name : "not found",
                message : "the user was not found"
            }
            throw err
        }

        const follow = followRepo.create({
            follower_id : follower,
            followed_id : followedTo
        })

        console.log(follow)
        await followRepo.save(follow)
        return follow
    }
    catch(err){
        throw err
    }
}