import { Code } from "typeorm";
import { AppDataSource } from "../database/DataSource.js";
import { Post } from "../database/Entity/post.entity.js";
import Profiles from "../database/Entity/profile.entity.js";
import { post } from "../interface/interface.js";


const createPostSerive = async(data : post, user : any) => {
    try{
        console.log(user)
        if(data?.content || data?.media){
            const err = {
                success : false,
                status : 400,
                name : "bad request",
                message : "must contain media or content in the post"
            }
            throw err
        }
        const userRepo = AppDataSource.getRepository(Profiles)
        const userInfo = await userRepo.findOne({
            where : {user_id : user.user_id},
            relations : ["posts"]
        })

        console.log(userInfo)

        const content  = data?.content
        const media = data?.media
        const feeling = data?.feeling
        const privacy = data?.privacy ?? "user"
        const tagged_id = data?.tagged

        const postRepo = AppDataSource.getRepository(Post)
        const newPost = postRepo.create({
            content : content, 
            media : media,
            feeling : feeling,
            privacy : privacy, 
            user : user.user_id,
            profiles : tagged_id
        })
        const response = await postRepo.save(newPost)
        return response
    }
    catch(err){
        throw err
    }
}

export {createPostSerive}