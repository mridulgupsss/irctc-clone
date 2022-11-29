import React, {useState} from "react";
import Tickets from "./Tickets.jsx";
import "./mybookings.css";

function Mybookings () {
    const [bookings, setBookings] = useState([]);
    function showBookings(ticket) {
        return <Tickets props={ ticket }/>;
    }

    const getTickets = async () => {
        let userId = {id: sessionStorage.getItem("userID")};

        console.log(userId);
        try {
            const response = await fetch("http://localhost:5050/getBookings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userId),
            });
            let res = await response.json();
            console.log("here");
            console.log(res);
            //console.log(res);
            setBookings(res);
            //console.log(bookings);
          } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getTickets();
    }, []);


    return (
        <div className="mybookings">
            <div className="mybookings-child"><h1>Your Bookings</h1></div>
            <div>
                { bookings.lenght===0 ? " " : <div>
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
                    </div>
                }
                {bookings.map(showBookings)};
            </div>
        </div>
    );
}

export default Mybookings;