import {Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Post } from "./post.entity.js";


@Entity()
@Unique(['gmail'])
class Profiles{
    @PrimaryGeneratedColumn()
    user_id !: number

    @Column({type : "varchar", length : 100})
    name !: string

    @Column({type : "varchar", length : 100})
    username !: string

    @Column({type : "varchar", length : 100})
    password !: string

    @Column({type : "varchar", length : 100})
    gmail !: string

    @Column({type : "enum", enum : ["user", "admin", "superadmin"], default : "user"})
    role !: string

    @OneToMany(() => Post, (post) => post.user)
    posts !: Post[]

    @ManyToMany(() =>  Post, (post)=> post.profiles)
    tagged_post !: Post[]

    @CreateDateColumn()
    created_at !: Date
}

export default Profiles