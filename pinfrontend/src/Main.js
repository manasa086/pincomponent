import React,{useState,useEffect} from 'react';
import "./Main.css";
import {useHistory} from "react-router-dom";
import { Button } from 'reactstrap';
import { routes } from './routes';

function Main() {

    const [otp,setOTP]=useState("");
    const history=useHistory();

    useEffect(()=>{
        fetch('https://manasa-pin-component.herokuapp.com/getOTP')
        .then((res)=>res.json())
        .then((data)=>{
            // console.log(data.message)
            setOTP(data.message.toString());
        })
    },[])

  

    const sendOTP=()=>{
        sessionStorage.setItem("count",0);
        history.push(routes.home.replace(":id",otp));
    }

    if(otp.length)
    {

        return (
            <div>
                <h1  className="main">Welcome to PIN Input Component</h1>
                <Button className="button" onClick={sendOTP} >Send OTP</Button>
            </div>
        )
    }
    else{
        return null;
    }
}

export default Main
