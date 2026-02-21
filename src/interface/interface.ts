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

export {logIn, signUp, post}