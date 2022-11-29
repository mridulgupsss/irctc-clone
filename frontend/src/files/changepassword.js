import React, {useState} from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import './files.css'

function ChangePassword() {
    let userID=sessionStorage.getItem("userID");
    const [passwords, setPasswords] = useState({
      userId: userID,
      newPassword: "",
      oldPassword: ""
    });

    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5050/changePasswords", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(passwords),
        });
        let res = await response.json();
        console.log(res);
        if(!res.success){
          alert("Password Change Failed.");
        }
        else{
          alert("Password Changed Succesfully.");
          window.location.href = "/";
        }
      } catch (err) {
        console.log(err);
      }
    };

    function handleChange(event) {
      const newValue = event.target.value;
      const inputname = event.target.name;
      setPasswords((prevValue) => {
        if (inputname === "oldPassword") {
          return {
            userId: userID,
            oldPassword: newValue,
            newPassword: prevValue.newPassword,
          };
        } else {
          return {
            userId: userID,
            oldPassword: prevValue.oldPassword,
            newPassword: newValue,
          };
        }
      });
    }

    return (
        <div className="change_password" >
        <div>
        <h3>Change Password</h3>
            <br />
            <form onSubmit={onSubmitForm}>
              <TextField
                sx={{ width: 319 }}
                required
                id="outlined-required"
                name="oldPassword"
                label="Old Password"
                type="password"
                onChange={handleChange}
              />
              <br />
              <br />
              <TextField
                sx={{ width: 319 }}
                id="outlined-password-input"
                required
                label="New Password"
                name="newPassword"
                type="password"
                autoComplete="current-password"
                onChange={handleChange} 
              />
              <br /> <br />
              <Button type="submit" variant="contained">
                CHANGE PASSWORD
              </Button>
            </form>
        </div>
    </div>
    );
}

export default ChangePassword;