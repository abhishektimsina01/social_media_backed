import { AppDataSource } from "../database/DataSource.js";
import Profiles from "../database/Entity/profile.entity.js";
import { signUp } from "../interface/interface.js";

export class ProfileRepository {
    private profileRepository = AppDataSource.getRepository(Profiles)

    public getProfile = async (id : number) : Promise<Profiles | null> => {
        const user = await this.profileRepository.findOne({
                where : {user_id : id},
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
        return user
    }

    public findUserByEmail = async (email : string) => {
        const user = await this.profileRepository.findOne({
            where : {
                gmail : email
            }
        })
        return user
    }

    public createUser = async (data : signUp): Promise<Profiles> => {
        const user : Profiles = this.profileRepository.create(data)
        const response : Profiles = await this.profileRepository.save(user)
        return response
    }

    public deleteUsers = async (): Promise<void> => {
        await this.profileRepository.deleteAll()
    }

    public deleteUser = async <T>(key:string, value : T): Promise<void> => {

    }
}