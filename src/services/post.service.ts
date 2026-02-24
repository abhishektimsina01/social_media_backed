import { Code, In } from "typeorm";
import { AppDataSource } from "../database/DataSource.js";
import { Post } from "../database/Entity/post.entity.js";
import Profiles from "../database/Entity/profile.entity.js";
import { post } from "../interface/interface.js";


const createPostSerive = async(data : post, user : any) => {
    try{
        console.log(data, user)
        if(!data){
            const err = {
                success : false,
                status : 400,
                name : "bad request",
                message : "must send data"
            }
            throw err
        }
        if(data?.content == data?.media == undefined){
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
            where : {user_id : user.id},
            relations : ["posts"]
        })
        if(!userInfo){
            const err = {
                success : false,
                message : "no user found",
                name : "there was no user"
            }
            throw err
        }
        console.log(userInfo)
        const content  = data?.content
        const media = data?.media
        const feeling = data?.feeling
        const privacy = data?.privacy ?? "user"
        const tagged_id = data?.tagged
        console.log(tagged_id)

        const postRepo = AppDataSource.getRepository(Post)
        const newPost = postRepo.create({
            content : content, 
            media : media,
            feeling : feeling,
            privacy : privacy, 
            user : userInfo,
        })

        if(tagged_id){
            const users = await userRepo.find({
                where : {user_id : In([...tagged_id])},
                select : ["user_id", "username"]
            })
            console.log(users)
            newPost.profiles = users
        }
        console.log(newPost)
        const response = await postRepo.save(newPost)
        return response
    }
    catch(err){
        throw err
    }
}

const deletePostService = async(postId : number, data : any) => {
    try{
        console.log(postId, data)
        const postRepo = AppDataSource.getRepository(Post)
        const post = await postRepo.findOne({
            where : {post_id : postId},
            select : {
                user : {
                    user_id : true,
                    username : true,
                    created_at : true
                },
                profiles : {
                    user_id : true,
                    username : true,
                    gmail : true
                }
            },
            relations : ["user", "profiles"]
        })
        console.log("", post)
        return post
    }
    catch(err){
        throw err
    }
}

const editPostService = (postId : number, ) => {
    try{

    }
    catch(err){
        throw err
    }
}

export {createPostSerive, deletePostService, editPostService}