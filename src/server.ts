import app from "./app.js"


app.listen(process.env.port, (err)=>{
    if(err){
        console.log("Server hasn't been started")
    }
    else{
        console.log("server has started successfully")
    }
})