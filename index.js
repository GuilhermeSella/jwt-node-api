const express = require("express")
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")
const secret = 'guilhermeSella';
const app = express()

app.use(bodyParser.json())

app.get("/", (req,res)=>{
    res.json({
        message:"Tudo ok!"
    })
})


//MiddleWare para verificar token
function verifyJWT(req,res, next){
    const token = req.headers['x-acess-token']
    const index = blacklist.findIndex(token)

    if(index != -1) return res.status(401).end();

    jwt.verify(token, secret, (error, decoded)=>{
        if(error) return res.status(401).end();
        
        req.userId = decoded.userId;
        next();
    })
    
}

app.get("/usuarios", verifyJWT, (req,res)=>{
    console.log(req.userId + "fez uma chamada")
    res.json({
        id:1,
        nome:"Guilherme"
    })
})

app.post("/login", (req,res)=>{
    if(req.body.user === "Guilherme" && req.body.password == '123123'){
        const token = jwt.sign({userId:1}, secret, {expiresIn:300})
        return res.json({auth:true, token});
    }
    res.status(401).end()
})


const blacklist = []

app.post("/logout", (req,res)=>{
    blacklist.push(req.body.headers['x-acess-token'])
    
    res.end()
})

app.listen(8000)




