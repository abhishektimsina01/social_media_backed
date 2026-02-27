import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Profiles from "./profile.entity.js";
import { User } from "../../interface/interface.js";
import { Post } from "./post.entity.js";

@Entity()
class Comments{
    @PrimaryGeneratedColumn()
    comment_id !: number

    @Column({ type : 'varchar', length : 20})
    comment !: string

    @Column({ type : "boolean", default : false})
    isHidden !: boolean

    @ManyToOne(() => Profiles, (profile) => profile.comments)
    @JoinColumn({
        name: "userId",
        referencedColumnName : "user_id"
    })
    user !: User

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({
        name : "postId",
        referencedColumnName : "post_id"
    })
    post !: Post

    @CreateDateColumn()
    created_at !: Date

    @UpdateDateColumn()
    updated_at !: Date
}

export {Comments}