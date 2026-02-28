import { Timestamp } from "typeorm"

interface logIn{
    gmail : string
    password : string
}

interface signUp{
    gmail : string,
    password : string,
    name : string,
    username : string
}

interface post{
    content ?: string,
    media ?: string,
    feeling ?: string,
    privacy ?: string
    tagged ?: number[]
}

interface User{
    id ?: number,
    gmail ?: string,
    role : string,
    iat ?: Timestamp,
    exp ?: Timestamp
}

interface Comment{
    content : string,
    isHidden : boolean
}

export {logIn, signUp, post, User, Comment}