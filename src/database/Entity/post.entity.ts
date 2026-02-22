import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import Profiles from "./profile.entity.js";
import { Tagged } from "./ManyToManyRelationship/post_profile.entity.js";

@Entity()
class Post{

    @PrimaryGeneratedColumn()
    post_id !: number

    @Column({type : "varchar", length : 200})
    content !: string

    @Column({type : "enum",enum : ["happy", "sad", "angry", "wow"], nullable : true})
    feeling !: string

    @Column({type : "enum", enum : ["private", "public"], default : "public"})
    privacy !: string

    @Column({type : "varchar", default : null})
    media !: string

    @ManyToOne(()=>Profiles, (profile) => profile.posts)
    @JoinColumn()
    user !: Profiles

    @ManyToMany(() => Profiles, (profile) => profile.tagged_post)
    @JoinTable({
        name : "tagged_user_post",
        joinColumn : {
            name : "post_id",
            referencedColumnName : "post_id"
        },
        inverseJoinColumn : {
            name : "user_id",
            referencedColumnName : "user_id"
        }
    })
     profiles !: Profiles[]

    @CreateDateColumn()
    cretaed_at !: Date

    @UpdateDateColumn()
    updated_at !: Date

}

export {Post}