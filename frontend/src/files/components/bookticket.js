import React, { useState } from "react";
import "../files.css";
import "./bookticket.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Details from "../Details";

function Bookticket() {
  const [flag, setFlag] = useState(false);

  const [trainDeatails, setTrainDetails] = useState({
    departure: "",
    arrival: "",
    date: "",
  });

  const [trainResult, setTrainResult] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/getTrains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trainDeatails),
      });
      let res = await response.json();
      console.log(res);
      setTrainResult((prevValue) => {
        return res;
      });
      console.log(trainResult);
      console.log("chaning states");
      setFlag(true);
    } catch (err) {
      console.log(err);
    }
  };

  function showTrains(train) {
    return <Details key={train.trainid} props={train} />;
  }

  function handleChange(event) {
    const newValue = event.target.value;
    const inputname = event.target.name;
    setTrainDetails((prevValue) => {
      if (inputname === "departure") {
        return {
          departure: newValue,
          arrival: prevValue.arrival,
          date: prevValue.date,
        };
      } else if (inputname === "arrival") {
        return {
          departure: prevValue.departure,
          arrival: newValue,
          date: prevValue.date,
        };
      } else {
        return {
          departure: prevValue.departure,
          arrival: prevValue.arrival,
          date: newValue,
        };
      }
    });
  }

  return (
    <div className="bookticket">
      <div className="flex-child">
        <h2>Book Your Ticket </h2>
        <form onSubmit={onSubmitForm}>
          <div className="ticket-from-flex">
            <div className="ticket-from-flex-child">
              <TextField
                id="outlined-search"
                label="Departure"
                type="search"
                name="departure"
                required
                onChange={handleChange}
              />
            </div>
            <div className="ticket-from-flex-child">
              <TextField
                id="outlined-search"
                label="Arrival"
                type="search"
                name="arrival"
                required
                onChange={handleChange}
              />
            </div>
            <div className="ticket-from-flex-child">
              <input
                className="ticket-date"
                type="date"
                id="Jdate"
                lable="date"
                placeholder="YYYY-MM-DD"
                required
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                name="date"
                onChange={handleChange}
              ></input>
            </div>
            <div className="ticket-from-flex-child">
              <Button type="submit" variant="contained">
                SEARCH TRAINS
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-child">
        <div>
          {flag === false ? (
            " "
          ) : (
            <div>
              <h3 className="margin-10-10">{trainResult.length} Results</h3>
              <div className="margin-10-10">
                {trainResult.length === 0 ? (
                  " "
                ) : (
                  <div className="margin-10-10">
                    <div className="information">
                      <div className="data">
                        <h3>Train Name</h3>
                      </div>
                      <div className="data">
                        <h3>Departure</h3>
                      </div>
                      <div className="data">
                        <h3>Duration</h3>
                      </div>
                      <div className="data">
                        <h3>Arrival</h3>
                      </div>
                    </div>
                    {trainResult.map(showTrains)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookticket;
