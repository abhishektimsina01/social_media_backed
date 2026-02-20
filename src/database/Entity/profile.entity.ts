import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['gmail'])
class Profiles{
    @PrimaryGeneratedColumn()
    user_id !: number

    @Column({type : "varchar", length : 15})
    name !: string

    @Column({type : "varchar", length : 15})
    username !: string

    @Column({type : "varchar", length : 30})
    password !: string

    @Column({type : "varchar", length : 100})
    gmail !: string

    @Column({type : "varchar", enum : ["user", "admin", "superadmin"] , length : 11})
    role !: string

    @CreateDateColumn()
    created_at !: Date
}

export default Profiles

// user_id
// username
// password
// prfile photo
// bio
// gmail
// created_at