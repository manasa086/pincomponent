import React,{useEffect,useState,useRef} from 'react';
import {useHistory} from "react-router-dom";
import {useParams} from "react-router-dom";
import "./App.css";
import {routes} from "./routes";

function Home() {



    let [count,setCount]=useState(0);
    const history=useHistory();
    let [inputValue1,setInputValue1]=useState("");
    let [inputValue2,setInputValue2]=useState("");
    let [inputValue3,setInputValue3]=useState("");
    let [inputValue4,setInputValue4]=useState("");
    let [inputValue5,setInputValue5]=useState("");
    const [inputClassName1,setInputClassName1]=useState(false);
    const [inputClassName2,setInputClassName2]=useState(false);
    const [inputClassName3,setInputClassName3]=useState(false);
    const [inputClassName4,setInputClassName4]=useState(false);
    const [inputClassName5,setInputClassName5]=useState(false);
    const [message,setMessage]=useState(sessionStorage.getItem("count").toString()>="3"?"OTP cannot be re-generated. As, resend limit had exceeded 3 attempts 😞":"");
    let [disableButton,setDisableButton]=useState(sessionStorage.getItem("count").toString()>="3"?true:false);

//    let count=0;
    let inp=useRef();
    const  { id }=useParams();
    const [otp,setOTP]=useState(id);

    // useEffect(()=>{
    //     sessionStorage.setItem("count",0);
    // },[])
    

    const changeInput1=(e)=>{
        let arr=[];
        for(let i=0;i<e.target.value.length;i++)
        {
            if(e.target.value.charAt(i)>='0' && e.target.value.charAt(i)<='9')
                arr.push(e.target.value.charAt(i));
        }
        if(e.target.value.length>1 && arr.length>1 && id.length==3)
        {
            setInputValue1(arr[0]);
            setInputValue2(arr[1]);
            setInputValue3(arr[2]);
            document.getElementById("input3").focus();
        }
        else if(e.target.value.length>1 && arr.length>1 && id.length==4)
        {
            setInputValue1(arr[0]);
            setInputValue2(arr[1]);
            setInputValue3(arr[2]);
            setInputValue4(arr[3]);
            document.getElementById("input4").focus();
        }
        else if(e.target.value.length>1 && arr.length>1 && id.length==5)
        {
            setInputValue1(arr[0]);
            setInputValue2(arr[1]);
            setInputValue3(arr[2]);
            setInputValue4(arr[3]);
            setInputValue5(arr[4]);
            document.getElementById("input5").focus();
        }
        else if(e.target.value.length==1)
        {
         
            if(e.target.value>='0' && e.target.value<='9')
            {
                setInputValue1(e.target.value);
                setInputClassName1(false);
                document.getElementById("input2").focus();
            }
            else if(e.target.value!="" && !(e.target.value>='0' && e.target.value<='9')){
                setInputClassName1(false);
            }
            
        
        }
        
        
        
    }
    const changeInput2=(e)=>{
        
       
        if(e.target.value>='0' && e.target.value<='9' && e.target.value.length==1)
        {
            setInputValue2(e.target.value);
            document.getElementById("input3").focus();
            setInputClassName2(false);
            
        }else if(e.target.value!="" && !(e.target.value>='0' && e.target.value<='9')){
            setInputClassName2(false);
        }
        
    }
    const changeInput3=(e)=>{
        
       
        if(e.target.value>='0' && e.target.value<='9' && e.target.value.length==1 && id.length==3)
        {
            setInputValue3(e.target.value);
            document.getElementById("input3").focus();
            setInputClassName3(false);
        }
        else if(e.target.value>='0' && e.target.value<='9' && e.target.value.length==1 && id.length>3)
        {
            setInputValue3(e.target.value);
            document.getElementById("input4").focus();
            setInputClassName3(false);
        }
        else if(e.target.value!="" && !(e.target.value>='0' && e.target.value<='9')){
            setInputClassName3(false);
        }
        
        
    }
    const changeInput4=(e)=>{
        
        if(e.target.value>='0' && e.target.value<='9' && e.target.value.length==1 && id.length==4)
        {
            setInputValue4(e.target.value);
            document.getElementById("input4").focus();
            setInputClassName4(false);
        }
        else if(e.target.value>='0' && e.target.value<='9' && e.target.value.length==1 && id.length==5)
        {
            setInputValue4(e.target.value);
            document.getElementById("input5").focus();
            setInputClassName4(false);
        }
        else if(e.target.value!="" && !(e.target.value>='0' && e.target.value<='9')){
            setInputClassName4(false);
        }
        
    }
    const changeInput5=(e)=>{
        
       
        if(e.target.value>='0' && e.target.value<='9' && e.target.value.length==1 && id.length==5)
        {
            setInputValue5(e.target.value);
            document.getElementById("input5").focus();
            setInputClassName5(false);
        }
        else if(e.target.value!="" && !(e.target.value>='0' && e.target.value<='9')){
            setInputClassName5(false);
        }
        
    }
    const keyDown1=(e)=>{
        // console.log("Hello")
        if(e.keyCode==8){
            setInputValue1("");
        }
    }
    const validateOTP=()=>{
        let res="";
        if(otp.length==3)
        {
            let focusElement="";
            if(inputValue1!="")
            {
                res+=inputValue1.toString();
            }
            else{
                setInputClassName1(true);
                focusElement="input1";
                // document.getElementById("input1").focus();
            }
            if(inputValue2!="")
            {
                res+=inputValue2.toString();
            }
            else{
                setInputClassName2(true);
                if(focusElement=="")
                {
                    focusElement="input2"
                }
                // document.getElementById("input2").focus();
            }
            if(inputValue3!="")
            {
                res+=inputValue3.toString();
            }
            else{
                setInputClassName3(true);
                if(focusElement=="")
                {
                    focusElement="input3"
                }
                // document.getElementById("input3").focus();
            }
            if(focusElement!="")
            {
                document.getElementById(focusElement.toString()).focus();
            }
            if(res.length==3)
            {
                let data={
                    otp,
                    otp_filled:res
                }
                fetch("https://manasa-pin-component.herokuapp.com/validateOTP",{
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{
                    if(data.message=="Number is verified 😃")
                    {
                        history.push(routes.welcome);
                    }
                    else{
                        setMessage(data.message)
                    }
                })
            }
        }
        if(otp.length==4)
        {
            let focusElement="";
            if(inputValue1!="")
            {
                res+=inputValue1.toString();
            }
            else{
                setInputClassName1(true);
                focusElement="input1";
                // document.getElementById("input1").focus();
            }
            if(inputValue2!="")
            {
                res+=inputValue2.toString();
            }
            else{
                setInputClassName2(true);
                if(focusElement=="")
                {
                    focusElement="input2"
                }
                // document.getElementById("input2").focus();
            }
            if(inputValue3!="")
            {
                res+=inputValue3.toString();
            }
            else{
                setInputClassName3(true);
                if(focusElement=="")
                {
                    focusElement="input3"
                }
                // document.getElementById("input3").focus();
            }
            if(inputValue4!="")
            {
                res+=inputValue4.toString();
            }
            else{
                setInputClassName4(true);
                if(focusElement=="")
                {
                    focusElement="input4"
                }
                // document.getElementById("input4").focus();
            }
            if(focusElement!="")
            {
                document.getElementById(focusElement.toString()).focus();
            }
            if(res.length==4)
            {
                let data={
                    otp,
                    otp_filled:res
                }
                fetch("https://manasa-pin-component.herokuapp.com/validateOTP",{
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{
                    if(data.message=="Number is verified 😃")
                    {
                        history.push(routes.welcome);
                    }
                    else{
                        setMessage(data.message)
                    }
                })
            }
        }
        if(otp.length==5)
        {
            let focusElement="";
            if(inputValue1!="")
            {
                res+=inputValue1.toString();
            }
            else{
                setInputClassName1(true);
                focusElement="input1";
                // document.getElementById("input1").focus();
            }
            if(inputValue2!="")
            {
                res+=inputValue2.toString();
            }
            else{
                setInputClassName2(true);
                if(focusElement=="")
                {
                    focusElement="input2"
                }
                // document.getElementById("input2").focus();
            }
            if(inputValue3!="")
            {
                res+=inputValue3.toString();
            }
            else{
                setInputClassName3(true);
                if(focusElement=="")
                {
                    focusElement="input3"
                }
                // document.getElementById("input3").focus();
            }
            if(inputValue4!="")
            {
                res+=inputValue4.toString();
            }
            else{
                setInputClassName4(true);
                if(focusElement=="")
                {
                    focusElement="input4"
                }
                // document.getElementById("input4").focus();
            }
            if(inputValue5!="")
            {
                res+=inputValue5.toString();
            }
            else{
                setInputClassName5(true);
                if(focusElement=="")
                {
                    focusElement="input5"
                }
                // document.getElementById("input5").focus();
            }
            if(focusElement!="")
            {
                document.getElementById(focusElement.toString()).focus();
            }
            if(res.length==5)
            {
                let data={
                    otp,
                    otp_filled:res
                }
                fetch("https://manasa-pin-component.herokuapp.com/validateOTP",{
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{
                    if(data.message=="Number is verified 😃")
                    {
                        history.push(routes.welcome);
                    }
                    else{
                        setMessage(data.message)
                    }
                })
            }
        }
        
    }
    const reSend=()=>{
     setCount(count++);
     let count1=sessionStorage.getItem("count");
     sessionStorage.setItem("count",Number(count1)+1);
    //  console.log(sessionStorage.getItem("count"))
       if(sessionStorage.getItem("count").toString()>="3")
       {
           setDisableButton(true);
           setMessage("OTP cannot be re-generated. As, resend limit had exceeded 3 attempts 😞")  
           
       }
       else{
        fetch('https://manasa-pin-component.herokuapp.com/getOTP')
        .then((res)=>res.json())
        .then((data)=>{
            // setMessage("OTP is"+data.message.toString());
            setOTP(data.message.toString());
            // console.log(data.message.toString());

        })
    }


    }
    const keyDown2=(e)=>{
        if(e.keyCode==8){
            if(inputValue2=="")
            {
                setInputValue2("");
            inp.current.focus();
            setInputValue1(inputValue1);
            }
            else{
                setInputValue2("");
                
            }
        }
    }
    const keyDown3=(e)=>{
        if(e.keyCode==8){
            if(inputValue3=="")
            {
                setInputValue3("");
                document.getElementById("input2").focus();
                setInputValue2(inputValue2);
                setInputValue1(inputValue1);
            }
            else{
                setInputValue3("");
            }
        }
    }
    const keyDown4=(e)=>{
        if(e.keyCode==8){
            if(inputValue4=="")
            {
            setInputValue4("");
            document.getElementById("input3").focus();
            setInputValue3(inputValue3);
            setInputValue2(inputValue2);
            setInputValue1(inputValue1);
            }
            else{
                setInputValue4("");
            }
        }
    }
    const keyDown5=(e)=>{
        if(e.keyCode==8){
            if(inputValue5=="")
            {
                setInputValue5("");
                document.getElementById("input4").focus();
                setInputValue4(inputValue4);
                setInputValue3(inputValue3);
                setInputValue2(inputValue2);
                setInputValue1(inputValue1);
            }
            else{
                setInputValue5("");
            }
        }
    }
    if(otp.length==3)
    {
        return (
            <div className="container">
                <h2>OTP is {otp}</h2>
                <div className="row mt-5">

                <div className="col-3"><input type="text" className={inputClassName1?"control1":"control"} name="input1" id="input1" ref={inp} onChange={changeInput1} inputMode='decimal' pattern='\d*' onKeyDown={keyDown1} value={inputValue1}></input></div>
                <div className="col-3">
                <input type="text" name="input2" id="input2" value={inputValue2} className={inputClassName2?"control1":"control"}  onKeyDown={keyDown2} inputMode='decimal' pattern='\d*' onChange={changeInput2}></input></div>
                <div className="col-3"><input type="text" name="input3" id="input3" value={inputValue3}   className={inputClassName3?"control1":"control"} onKeyDown={keyDown3} inputMode='decimal' pattern='\d*' onChange={changeInput3}></input></div>
                </div>
                <div className="center">
                <button onClick={validateOTP} className="resendButton" >Validate OTP</button><span className="between"></span>
                <button onClick={reSend} className={disableButton?"resendButton1":"resendButton"} disabled={disableButton}>Resend OTP</button></div>
                <h4>{message}</h4>
            </div>
        )
    }
    else if(otp.length==4)
    {
        return (
            <div className="container">
                <h2>OTP is {otp}</h2>
            <div className="row mt-5"> 
                <div className="col-3">
                <input type="text" name="input1" id="input1" className={inputClassName1?"control1":"control"} ref={inp} onChange={changeInput1} inputMode='decimal' pattern='\d*' onKeyDown={keyDown1} value={inputValue1}></input></div> 
                <div className="col-3"><input type="text"  className={inputClassName2?"control1":"control"} name="input2" id="input2" value={inputValue2}  onKeyDown={keyDown2} inputMode='decimal' pattern='\d*' onChange={changeInput2}></input> </div>
                <div className="col-3"><input type="text" name="input3" id="input3" className={inputClassName3?"control1":"control"} value={inputValue3}  onKeyDown={keyDown3} inputMode='decimal' pattern='\d*' onChange={changeInput3}></input></div>
                <div className="col-3"><input type="text" name="input4" id="input4"  className={inputClassName4?"control1":"control"} onChange={changeInput4} inputMode='decimal' pattern='\d*' onKeyDown={keyDown4} value={inputValue4}></input> </div>
                
                </div>
                <div className="center">
                <button onClick={validateOTP} className="resendButton" >Validate OTP</button><span className="between"></span>
                <button onClick={reSend} className="resendButton" disabled={disableButton}>Resend OTP</button></div>
                <h4>{message}</h4>
                
            </div>
        )
    }
    else if(otp.length==5)
    {
        return (
            <div className="container">
                <h2>OTP is {otp}</h2>
            <div className="row mt-5"> 
                <div className="col-2">
               <input type="text" name="input1" id="input1" className={inputClassName1?"control1":"control"}  ref={inp} onChange={changeInput1} inputMode='decimal' pattern='\d*' onKeyDown={keyDown1} value={inputValue1}></input></div> 
               <div className="col-2"><input type="text" className={inputClassName2?"control1":"control"}  name="input2" id="input2" value={inputValue2}  onKeyDown={keyDown2} inputMode='decimal' pattern='\d*' onChange={changeInput2}></input></div>
               <div className="col-2"><input type="text"  className={inputClassName3?"control1":"control"} name="input3" id="input3" value={inputValue3}  onKeyDown={keyDown3} inputMode='decimal' pattern='\d*' onChange={changeInput3}></input></div>
               <div className="col-2"><input type="text" className={inputClassName4?"control1":"control"}  name="input4" id="input4"  onChange={changeInput4} inputMode='decimal' pattern='\d*' onKeyDown={keyDown4} value={inputValue4}></input></div> 
               <div className="col-2"><input type="text" className={inputClassName5?"control1":"control"}  name="input4" id="input5"  onChange={changeInput5} inputMode='decimal' pattern='\d*' onKeyDown={keyDown5} value={inputValue5}></input></div>                               
            </div>
            <div className="center">
            <button onClick={validateOTP} className="resendButton" >Validate OTP</button><span className="between"></span>
                <button onClick={reSend} className={disableButton?"resendButton1":"resendButton"} disabled={disableButton}>Resend OTP</button></div>
            <h4>{message}</h4>
            </div>

        )
    }
    else{
        return null;
    }
}

export default Home
