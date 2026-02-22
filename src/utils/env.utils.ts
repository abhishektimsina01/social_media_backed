import dotenv from "dotenv"
dotenv.config()

const fetch = (key : string) => {
    console.log(Object.keys(process.env).includes(key))
    console.log(Object.keys(process.env).includes(key) ? process.env[key] : null)
    return Object.keys(process.env).includes(key) ? process.env[key] : null
}

export {fetch}