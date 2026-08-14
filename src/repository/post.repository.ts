import { AppDataSource } from "../database/DataSource.js";
import { Post } from "../database/Entity/post.entity.js";
import { post } from "../interface/interface.js";


export class PostRepository{
    private postRepository = AppDataSource.getRepository(Post)

    public createPost = async (data : post) => {
        console.log(data)
        const post = this.postRepository.create(data)
        return post
    }
}