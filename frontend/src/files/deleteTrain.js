import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./files.css";

function DeleteTrain() {
  const [trainId, setTrainId] = useState({trainId : ""});

  const deleteTrain = async () => {
    try {
        const response = await fetch("http://localhost:5050/deleteTrain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trainId),
        });
        let res = await response.json();
        console.log(res);
        if(res.created===true){
          alert("Train succesfully deleted.");
        }
        else{
          alert("Train was not deleted.");
        }
      } catch (err) {
        console.log(err);
    }
    
  }


  const handleOnChange = (e) => {
    const v = e.target.value;
    setTrainId({trainId: v});
  };
  return (
    <div className="delete_train">
      <div className="delete_train_input">
        <h3>Delete Train</h3>
        <br />
        <TextField
          id="outlined-basic"
          label="Train ID"
          variant="outlined"
          onChange={handleOnChange}
        />
        <br /> <br />
        <Button variant="contained" onClick={deleteTrain}>
          Delete Train
        </Button>
      </div>
    </div>
  );
};


export default DeleteTrain;
