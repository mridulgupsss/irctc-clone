import React from "react";
import Button from "@mui/material/Button";

import "../files.css";
import "./navbar.css";

function Navbar() {
  let typeUser = sessionStorage.getItem("typeUser");

  function logOut() {
    sessionStorage.setItem("typeUser", "");
    sessionStorage.removeItem("userID");
    window.location.href = "/";
  }

  return (
    <>
      <>
        {(typeUser === null || typeUser === "") && (
          <div className="navbar_main">
            <div className="iror">
              <h3>
                <a
                  href="/"
                  className="a-link"
                  style={{ textDecoration: "none" }}
                >
                  IROR
                </a>
              </h3>
            </div>
            <div className="nav_buttons_C">
              <div>
                <Button variant="contained" href="./login">
                  LOGIN
                </Button>
              </div>
              <div>
                <Button variant="outlined" href="./register">
                  REGISTER
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
      <>
        {typeUser === "user" && (
          <div className="navbar_main">
            <div className="iror">
              <h3>
                <a
                  href="/"
                  className="a-link"
                  style={{ textDecoration: "none" }}
                >
                  IROR
                </a>
              </h3>
            </div>
            <div className="nav_buttons_C">
              <div>
                <Button onClick={logOut} variant="outlined">
                  LOGOUT
                </Button>
              </div>
              <a
                href="./mybookings"
                className="a-link margin-auto"
                style={{ textDecoration: "none" }}
              >
                <div>My Bookings</div>
              </a>
              <a
                href="./changepassword"
                className="a-link margin-auto"
                style={{ textDecoration: "none" }}
              >
                <div>Change Password</div>
              </a>
            </div>
          </div>
        )}
      </>
      <>
        {typeUser === "admin" && (
          <div className="navbar_main">
            <div className="iror">
              <h3>
                <a
                  href="/"
                  className="a-link"
                  style={{ textDecoration: "none" }}
                >
                  IROR
                </a>
              </h3>
            </div>
            <div className="nav_buttons_C">
              <div>
                <Button onClick={logOut} variant="outlined">
                  LOGOUT
                </Button>
              </div>
              <a href="/allBookings" className="a-link margin-auto" style={{ textDecoration: "none" }}>
                <div>View All Bookings</div>
              </a>
              <a href="/allTrains" className="a-link margin-auto" style={{ textDecoration: "none" }}>
                <div>View All Trains</div>
              </a>
              <a href="/deleteTrain" className="a-link margin-auto" style={{ textDecoration: "none" }}>
                <div>Delete Train</div>
              </a>
              <a href="/addTrain" className="a-link margin-auto" style={{ textDecoration: "none" }}>
                <div>Add Train</div>
              </a>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default Navbar;
