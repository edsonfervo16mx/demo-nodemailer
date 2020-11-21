const express = require("express")
const app = express()

app.get("/",function(request,response){
    console.log("Start demo-nodemailer...")
})

app.listen(3000)