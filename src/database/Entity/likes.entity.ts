// id
// post_id
// user_id
// reaction

import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Profiles from "./profile.entity.js";

@Entity()
class Likes{
    @PrimaryGeneratedColumn()
    like_id !: number

    // @ManyToOne(()=> post, (profile) => profile.l)
}

export {Likes}