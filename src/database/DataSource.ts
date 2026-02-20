import "reflect-metadata"
import {DataSource} from "typeorm"
import Profiles from "./Entity/profile.entity.js"


const AppDataSource = new DataSource({
    type : "mysql",
    username : "root",
    password : "abhishektimsina12345#####",
    port : 3306,
    host : "localhost",
    database : "social_media",
    synchronize : true,
    // logging : true,
    entities : [Profiles]
})

export {AppDataSource}