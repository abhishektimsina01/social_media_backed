import server from "./app.js"
import { AppDataSource } from "./database/DataSource.js"
import { fetch } from "./utils/env.utils.js"


fetch("secret_key")

AppDataSource.initialize().then(() => {
    console.log("database connected successfully")
    server.listen(process.env.port, (err) => {
       if(err){
           console.log("Server hasn't been started")
       }
       else{
           console.log("server has started successfully")
       }
   })
}).catch((err : Error) =>{
    console.log(err)
})