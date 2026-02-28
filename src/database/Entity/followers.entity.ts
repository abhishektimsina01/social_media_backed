import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Profiles from "./profile.entity.js";

@Entity()
class Followers{
    @PrimaryGeneratedColumn()
    follow_id !: number

    //user jasle follow garxa
    @ManyToOne(() => Profiles, (profile) => profile.following)
    @JoinColumn({
        name : "follower_id",
        referencedColumnName : "user_id"
    })
    follower_id !: Profiles

    // user jaslai follow gareko hunxa
    @ManyToOne(() => Profiles, (profile) => profile.followers)
    @JoinColumn({
        name : "followed_id",
        referencedColumnName : "user_id"
    })
    followed_id !: Profiles

    @CreateDateColumn()
    started_following_from !: Date
}

export {Followers}