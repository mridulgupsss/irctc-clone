import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./bookaticket.css";
import { useSearchParams } from 'react-router-dom';

function Bookaticket() {
  const [formFields, setFormFields] = useState([
    { name: "", age: "", gender: "" }
  ]);
  const [searchparams]=useSearchParams();
  console.log(searchparams.get("routeId"));

  const [contactInfo, setContactInfo] = useState({
    email: "",
    contact: ""
  });

  const handleContactChange = (event) =>{
    const newValue = event.target.value;
    const inputname = event.target.name;
    setContactInfo((prevValue) => {
      if (inputname === "email") {
        return {
          email: newValue,
          contact: prevValue.contact
        };
      } else {
        return {
          email: prevValue.email,
          contact: newValue
        };
      }
    });
  }

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let userId = sessionStorage.getItem("userID");
    let formData = {
      passengers: formFields,
      email: contactInfo.email,
      contactno: contactInfo.contact,
      userId: userId,
      routeId: searchparams.get("routeId"),
      trainId: searchparams.get("id"),
      sourceStation: searchparams.get("departure"),
      destinationStation: searchparams.get("arrival"),
      price: searchparams.get("price")*formFields.length,
    }
    console.log(formData);

    try {
      const response = await fetch("http://localhost:5050/bookTicket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      let res = await response.json();
      console.log(res);
      if(res.created===true){
        alert("Ticket Booked Succesfully");
        window.location.href = "/mybookings";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addFields = () => {
    let object = {
      name: "",
      age: "",
      gender: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);

    setFormFields(data);
  };

  return (
    <div className="bookaticket">
      <h2>Passenger Details</h2>
      <div>
        <form onSubmit={ submitForm }>
          <div className="repeat-passenger-container">
            {formFields.map((form, index) => {
              return (
                <div key={index}>
                  <div>
                    <h5>Passenger</h5>
                  </div>
                  <div className="repeat-passenger-flex">
                    <div className="repeat-passenger-flex-child">
                      <TextField
                        sx={{ width: 319 }}
                        required
                        name="name"
                        label="Name"
                        value={form.name}
                        onChange={(event) => handleFormChange(event, index)}
                      />
                    </div>
                    <div className="repeat-passenger-flex-child">
                      <TextField
                        sx={{ width: 319 }}
                        required
                        name="age"
                        label="Age"
                        value={form.age}
                        onChange={(event) => handleFormChange(event, index)}
                      />
                    </div>
                    <div className="repeat-passenger-flex-child">
                      <Select
                        sx={{ width: 319 }}
                        label="Gender"
                        name="gender"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.gender}
                      >
                        <MenuItem value={"M"}>Male</MenuItem>
                        <MenuItem value={"F"}>Female</MenuItem>
                        <MenuItem value={"O"}>Others</MenuItem>
                      </Select>
                    </div>
                    <div className="repeat-passenger-flex-child">
                      <Button
                        color="warning"
                        variant="contained"
                        required
                        onClick={() => removeFields(index)}
                      >
                        Remove Passenger
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <Button onClick={addFields} color="success" variant="contained">
                Add Passenger
              </Button>
            </div>
          </div>
          <div>
            <div className="">
              <h4>Contact Details</h4>
            </div>
            <div className="contact-details-flex">
              <div>
                <TextField
                  sx={{ width: 319 }}
                  required
                  name="email"
                  label="Email"
                  type="email"
                  value={ contactInfo.email }
                  onChange= { handleContactChange }
                />
              </div>
              <div>
                <TextField
                  sx={{ width: 319 }}
                  required
                  name="contact"
                  label="Contact No"
                  value={ contactInfo.contact }
                  onChange= { handleContactChange }
                />
              </div>
            </div>
          </div>
          <Button
            sx={{ backgroundColor: "#4CAF50" }}
            type="submit"
            variant="contained"
          >
            Pay and Book Ticket
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Bookaticket;
