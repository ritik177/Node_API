require("dotenv").config();// this is used for credencial 
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const PORT = 5004;

app.use(cors());//for cross origin error because when we send request from frontend port(port:3000) to backend port (5004) because off different port number
app.use(express.json());// jo bhi data frontend se aayega wo json ke form me aayega if we didnot write it then backend me request.body se hame koi data nahi milega

//get response 
app.get("/",(req,res)=>{
    res.status(200).json("server start")
});

//server start
app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
}); 