import { Collection, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class Profiles{
    
    @PrimaryGeneratedColumn()
    user_id !: number

    @Column({type : "varchar", length : 15})
    name !: string
}

export default Profiles

// user_id
// username
// password
// prfile photo
// bio
// created_at