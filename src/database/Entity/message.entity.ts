// // msg_id
// // content
// // sender_id
// // reciever_id
// // created_at

// import { Collection, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import Profiles from "./profile.entity.js";

// @Entity()
// class Message{
//     @PrimaryGeneratedColumn()
//     message_id !: number

//     @Column({type : "varchar"})
//     message !: string

//     @ManyToOne(() => Profiles, (profile) => profile.message)
//     sender 
// }