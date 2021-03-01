const express = require('express');
const path = require('path');
const cors=require('cors');
const app = express();
const PORT = process.env.PORT || 5000; 

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let otps=[576,1964,15764];

app.get("/getOTP",(req,res)=>{
    let getotp=otps[Math.floor(Math.random()*3)];
    res.json({
        message:getotp
    })

})

app.post("/validateOTP",(req,res)=>{
    // console.log(req.body.otp);
    if(otps.includes(Number(req.body.otp)))
    {
        if(req.body.otp.toString()==req.body.otp_filled.toString())
        {
            res.json({
                message:"Number is verified 😃"  
            })
        }
        else{
            res.json({
                message:"Number is not verified 😞"  
            })
        }
    }
    else{
        res.json({
            message:"Number not found 😞"
        })
    }
})

app.listen(PORT,console.log(`Server is starting at ${PORT}`))