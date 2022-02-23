
const express = require('express');
const app = express();
const cors= require('cors');

const connect = require("./config/db");
const userController = require("./controllers/user.controller");

app.use(cors());
app.use(express.json());

app.use("/users", userController);


const start = async ()=>{
    await connect();

    app.listen(5000,()=>{
        console.log("Listen on port 5000");
    })
}

module.exports = start;