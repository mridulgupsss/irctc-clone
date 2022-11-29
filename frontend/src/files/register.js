import React , { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import trainImg from "./register_img.png";

function Register() {
    const [user, setUser] = useState({
      fname: "",
      lname: "",
      email: "",
      contactNo: 0,
      Password: ""
    });

    function handleChange(event){
      const newValue = event.target.value;
      const inputname = event.target.name; 
      setUser(prevValue => {
        if(inputname === "fname"){
            return {
              fname: newValue,
              lname: prevValue.lname,
              email: prevValue.email,
              contactNo: prevValue.contactNo,
              Password: prevValue.Password,
            };
        }
        if(inputname === "lname"){
            return {
              fname: prevValue.fname,
              lname: newValue,
              email: prevValue.email,
              contactNo: prevValue.contactNo,
              Password: prevValue.Password
            };
        }
        if(inputname === "email"){
          return {
            fname: prevValue.fname,
            lname: prevValue.lname,
            email: newValue,
            contactNo: prevValue.contactNo,
            Password: prevValue.Password
          };
        }
        if(inputname === "contactNo"){
          return {
            fname: prevValue.fname,
            lname: prevValue.lname,
            email: prevValue.email,
            contactNo: newValue,
            Password: prevValue.Password
          };
        }
        if(inputname === "password"){
          return {
            fname: prevValue.fname,
            lname: prevValue.lname,
            email: prevValue.email,
            contactNo: prevValue.contactNo,
            Password: newValue
          };
        }
      })
    }

    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5050/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        });
        let res=await response.json();
        console.log(res);
        if(res.created){
          window.location.href = "/login";
        }else{
          alert("Invalid Credential. Please Try Again.");
        }
      }
      catch (err){
        console.log(err);
      }
    }

    return (
        <div className="login_page">
        <div className="login_main">
        <div className="train_image">
          <img src={trainImg} alt="Train"/>
        </div>
        <div className="login_input">
          <div>
            <h3>Register</h3>
            <br />
            <form onSubmit={ onSubmitForm }>
              <TextField
                sx={{width: 319}}
                required
                name="fname"
                label="First Name"
                value={ user.fname }
                onChange={handleChange}
              /> 
              <br />
              <br />
              <TextField
                sx={{width: 319}}
                required
                name="lname"
                label="Last Name"
                value={ user.lname }
                onChange={handleChange}
              />
              <br /> <br />
              <TextField
                sx={{width: 319}}
                required
                name="email"
                label="Email"
                type="email"
                value={ user.email }
                onChange={handleChange}
              />
              <br /> <br />
              <TextField
                sx={{width: 319}}
                required
                name="contactNo"
                label="Contact No"
                value={ user.contactNo }
                onChange={handleChange}
              />
              <br /> <br />
              <TextField
                sx={{width: 319}}
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={ user.Password }
                onChange={handleChange}
              />
              <br /><br />
              <Button type="submit" variant="contained">Create Account</Button>
            </form>
          </div>
        </div>
      </div>
        </div>
    );
}


export default Register;