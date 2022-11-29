import React from "react";
import "./CancelTickets.css";

function CancelTickets() {
    return (
        <div className="modal">
            <div className="container">
                <div className="data">
                    <h1>Are your sure?</h1>
                    <p className="b1">This action cannot be undone. This will permanently cancel the ticket. All the data regarding the ticket will be deleted.</p>
                </div>
                <div className="buttons">
                    <div><button className="btn1">No, Don't Cancel</button></div>
                    <div><button className="btn2">Yes, Cancel Ticket</button></div>
                </div>
            </div>
        </div>
    );
}