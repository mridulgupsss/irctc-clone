import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./addtrain.css";

function Addtrain() {
  const [routeFileds, setRouteFiles] = useState([
    {
      station: "",
      timeFromStart: "",
    },
  ]);

  const [trainInfo, setTrainInfo] = useState({
    trainName: "",
    runson: "",
    totalseats: "",
    starttime: "",
  });

  const handleTrainFrom = (event) => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setTrainInfo((preValue) => {
      if (inputName === "trainName") {
        return {
          trainName: newValue,
          runson: preValue.runson,
          totalseats: preValue.totalseats,
          starttime: preValue.starttime,
        };
      } else if (inputName === "runson") {
        return {
          trainName: preValue.trainName,
          runson: newValue,
          totalseats: preValue.totalseats,
          starttime: preValue.starttime,
        };
      } else if (inputName === "totalseats") {
        return {
          trainName: preValue.trainName,
          runson: preValue.runson,
          totalseats: newValue,
          starttime: preValue.starttime,
        };
      } else {
        return {
          trainName: preValue.trainName,
          runson: preValue.runson,
          totalseats: preValue.totalseats,
          starttime: newValue,
        };
      }
    });
  };

  const handleRouteForm = (event, index) => {
    let data = [...routeFileds];
    data[index][event.target.name] = event.target.value;
    setRouteFiles(data);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let formData = {
      routes: routeFileds,
      trainName: trainInfo.trainName,
      runson: trainInfo.runson,
      totalseats: trainInfo.totalseats,
      starttime: trainInfo.starttime,
    };
    console.log(formData);

      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5050/addTrain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        let res = await response.json();
        console.log(res);
        if(!res.success){
          alert("Train was not added.");
        }
        else{
          alert("Train added.");
          window.location.href = "/allTrains";
        }
      } catch (err) {
        console.log(err);
      }
    };

  const addFields = () => {
    let object = {
      station: "",
      timeFromStart: "",
    };

    setRouteFiles([...routeFileds, object]);
  };

  const removeFields = (index) => {
    let data = [...routeFileds];
    data.splice(index, 1);

    setRouteFiles(data);
  };

  return (
    <div className="add-train">
      <form>
        <h2>Train Detials</h2>
        <div className="train-details">
          <div className="train-details-child">
            <TextField
              required
              name="trainName"
              label="Train Name"
              value={trainInfo.trainName}
              onChange={handleTrainFrom}
            />
          </div>
          <div className="train-details-child">
            <TextField
              required
              name="runson"
              label="Runs On"
              value={trainInfo.runson}
              onChange={handleTrainFrom}
            />
          </div>
          <div className="train-details-child">
            <TextField
              required
              name="totalseats"
              label="Total Seats"
              value={trainInfo.totalseats}
              onChange={handleTrainFrom}
            />
          </div>
          <div className="train-details-child">
            <TextField
              required
              name="starttime"
              label="Start Time"
              value={trainInfo.starttime}
              onChange={handleTrainFrom}
            />
          </div>
        </div>
        <h2>Route Detials</h2>
        <div className="route-detials">
          <div className="route-form-container">
            {routeFileds.map((routes, index) => {
              return (
                <div className="route-form-repeat">
                  <div className="route-form-repeat-child">
                    <TextField
                      required
                      name="station"
                      label="Station Name"
                      value={routes.station}
                      onChange={(event) => handleRouteForm(event, index)}
                    />
                  </div>
                  <div className="route-form-repeat-child">
                    <TextField
                      required
                      name="timeFromStart"
                      label="Time From Start(mins)"
                      value={routes.timeFromStart}
                      onChange={(event) => handleRouteForm(event, index)}
                    />
                  </div>
                  <div className="route-form-repeat-child">
                    <Button color="warning" variant="contained" onClick={removeFields}>
                      Remove Station
                    </Button>
                  </div>
                  <div className="route-form-repeat-child"></div>
                </div>
              );
            })}
            <Button
              sx={{ backgroundColor: "#4CAF50" }}
              type="submit"
              variant="contained"
              onClick={ addFields }
            >
              Add Station
            </Button>
          </div>
        </div>
        <Button
          sx={{ backgroundColor: "#4CAF50" }}
          type="submit"
          variant="contained"
          onClick={ submitForm }
        >
          Add Train and Route
        </Button>
      </form>
    </div>
  );
}

export default Addtrain;
