import { In} from "typeorm";
import { AppDataSource } from "../database/DataSource.js";
import { Post } from "../database/Entity/post.entity.js";
import Profiles from "../database/Entity/profile.entity.js";
import { post, User } from "../interface/interface.js";
import { threadCpuUsage } from "node:process";


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
        console.log(content, media, feeling, privacy)
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
        await postRepo.delete(postId)
        console.log("deleted post: ", post)
        return post
    }
    catch(err){
        throw err
    }
}

const editPostService = async(postId : number, updateTo : post) => {
    try{
        console.log(postId)
        console.log(updateTo)
        const postRepo = AppDataSource.getRepository(Post)
        const post = await postRepo.findOne({
            where : {post_id : postId},
        })
        if(!post){
            const err = {
                success : true,
                name : "No post found",
                message : "there was no post found."
            }
            throw err
        }
        if(updateTo.content == updateTo.media == undefined){
            const err = {
                success : false,
                name : "Must contain atleast content or media",
                message : "Must contain the content or media"
            }
            throw err
        }
        post.content = updateTo?.content ?? post.content
        post.media = updateTo?.media ?? post.content
        post.feeling = updateTo?.feeling ?? post.feeling
        post.privacy = updateTo?.privacy ?? post.privacy
        if (updateTo.tagged){
            const users = await AppDataSource.getRepository(Profiles).find({
                where : {user_id : In([...updateTo.tagged])},
                select : {
                    user_id : true,
                    username : true
                }
            })
            post.profiles.push(...users)
        }
        await postRepo.save(post)
        return post
    }
    catch(err){
        throw err
    }
}

const likePostServices = async(postId : number, data : User) => {
    try{
        console.log(postId, data)
        const userRepo = AppDataSource.getRepository(Profiles)
        const user = await userRepo.findOne({
            where : {user_id : data.id},
            // select : {
            //     user_id : true,
            //     username : true,
            //     gmail : true
            // }
        })
        const postRepo = AppDataSource.getRepository(Post)
        const post = await postRepo.findOne({
            where : {post_id : postId},
            select : {
                post_id : true,
                content : true,
                feeling : true,
                privacy : true,
                profiles : {
                    user_id : true,
                    username : true,
                    gmail : true
                },
                likes : {
                    user_id : true,
                    username : true,
                    gmail : true
                },
                user : {
                    user_id : true,
                    username : true,
                    gmail : true
                }
            },
            relations : [ 'user', 'likes', 'profiles']
        })
        if(!user || !post){
            const err = {
                success : false,
                name : "not found",
                message : "no user or post was found"
            }
            throw user
        }
        console.log(post)
        console.log(user)
        post.likes.push(user)
        await postRepo.save(post)
        return post
    }
    catch(err){
        throw err
    }
}
 
export {createPostSerive, deletePostService, editPostService, likePostServices}