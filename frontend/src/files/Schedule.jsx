import React from "react";
import "./Schedule.css";

function Schedule(props) {
    var data = props.props;
    return (
        
        <tr>
            <td>{data.sNo}</td>
            <td>{data.stationName}</td>
            <td>{data.arrivalTime}</td>
            <td>{data.departureTime}</td>
        </tr>
                        
    );
}

export default Schedule;