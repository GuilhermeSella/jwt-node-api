const express = require("express")
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get("/", (req,res)=>{
    res.json({
        message:"Tudo ok!"
    })
})

app.get("/usuarios", (req,res)=>{
    res.json({
        id:1,
        nome:"Guilherme"
    })
})

app.post("/login", (req,res)=>{
    if(req.body.user === "Guilherme" && req.body.password == '123123'){
        return res.end();
    }
    res.status(401).end()
})

app.post("/logout", (req,res)=>{
    res.end()
})




