//tag_id
// post_id
// user_id


import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Profiles from "../profile.entity.js";
import { Post } from "../post.entity.js";

@Entity()
export class Tagged{

    @PrimaryGeneratedColumn()
    tagged_id !: number

    // @ManyToMany(() => Profiles, (profile) => profile.tagIds)
    @Column({type : "varchar"})
    profile_id !: string

    @Column({type : "varchar"})
    post_id !: string

    @CreateDateColumn()
    tagged_at !: Date
    
}