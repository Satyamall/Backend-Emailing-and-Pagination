
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const User = require('../models/user.model');

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    auth: {
        user: "507ddc9ad28023",
        pass: "f58d2bd6a26fe7"
    },
    port: 465,
    secure: false
  });

  
  // mailtrap
  
  router.post("/", async(req,res)=>{
      try{

        const user = await User.create(req.body);

        const admin = await User.find({roles: {$in: "admin"}},{_id: 0, email: 1});
        const arr = [];
        for(var i=0; i<admin.length; i++)
        {
            arr[i]=admin[i].email;
        }

        const message = {
              from: "noreply@satya.com",
              to: `${user.email}`,
              cc: arr,
              subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`,
              text: `Hi ${user.first_name}, Please confirm your email address`
          }

        transporter.sendMail(message,(err)=>{
            if(err){
                res.send(err);
            }
            res.status(201).send("Successfully send email")
        })
        return res.status(200).json({data: user})
    }
    catch(err){
        res.status(500).json({msg: "Something went wrong"});
    }
})

router.post("/admin", async (req,res)=>{
    try{
        const user = await User.create(req.body);

        return res.status(201).json({data: user});
    }
    catch(err)
    {
        res.status(500).json({msg: "Something went wrong"});
    }
})

router.get("/",async(req,res)=>{
    try{

        const page = req.query.page || 1;
        const size = req.query.limit || 5;

        const offset = (page-1)*size;

        const user = await User.find({}).skip(offset).limit(size);

        return res.status(200).json({data: user});
    }
    catch(err)
    {
        res.status(500).json({msg: "Something went wrong"});
    }
})

module.exports = router;