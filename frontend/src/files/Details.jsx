import React from "react";
import "./Details.css";
import Button from '@mui/material/Button';
import {createSearchParams , useNavigate} from "react-router-dom";
function Details(props) {
    props=props.props;
    const months={"01": "Jan","02": "Feb","03": "Mar","04": "Apr","05": "May","06": "Jun","07": "Jul","08": "Aug","09": "Sep","10": "Oct","11": "Nov","12": "Dec"};
    const navigate=useNavigate();
    const bookTicket = (id) => {
        navigate({
            pathname: "/pd",
            search: createSearchParams({
                id : props.trainid,
                remainingSeats: props.remainingSeats,
                departure: props.departure,
                arrival: props.arrival,
                routeId: props.routeId,
                price: props.price
            }).toString()
        });
    };

    return (
        <div className="trainDetails">

            <div>
                <div className="information"> 
                    <div className="box">
                        <h3>{props.trainName}</h3>
                        <h3>{props.trainid}</h3>
                        <h4 style={{color: '#4CAF50'}}>{props.remainingSeats} Left</h4>
                        <div style={{display: 'flex', gap: 30}}>
                            <Button onClick={bookTicket} variant="contained">Book</Button>
                            <h4 style={{color: '#03A9F4'}}>₹{props.price}</h4>
                        </div>
                    </div>
                    <div className="box">
                        <h3>{props.departure}</h3>
                        <h4>{props.departureTime}</h4>
                        <h4>{ props.departureDate.slice(8, 10) } {months[props.departureDate.slice(5, 7)]}</h4>
                    </div>
                    <div className="box">
                        <h5>{props.durationHours} Hrs {props.durationMinutes} Mins</h5>
                        <h5>Runs On</h5>
                        <h5>{props.runsOn}</h5>
                    </div>
                    <div className="box">
                        <h3>{props.arrival}</h3>
                        <h4>{props.arrivalTime}</h4>
                        <h4>{ props.arrivalDate.slice(8, 10) } {months[props.arrivalDate.slice(5, 7)]}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;