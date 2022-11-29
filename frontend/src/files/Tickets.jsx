import React from "react";
import "./tickets.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Tickets(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelTicket =  async () => {
    console.log(props.trainId);
    console.log(props);
    try {
        const response = await fetch("http://localhost:5050/deleteTicket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ticketId: props.ticketId}),
        });
        let res = await response.json();
        console.log(res);
      } catch (err) {
        console.log(err);
    }
    setOpen(false);
    window.location.href = "/mybookings";
  }

  props = props.props;
  
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  return (
    <div className="tickets-box">
      <div className="ticket-information">
        <div className="ticket-child">
          <h3>{props.trainName}</h3>
          <h3>{props.trainId}</h3>
          <h4>PNR: 12321JK12312</h4>
          <h4>{props.noOfPassengers} Passengers</h4>
        </div>
        <div className="ticket-child">
          <h3>{props.departureStation}</h3>
          <h4>{props.departureTime}</h4>
          <h4>
            {props.departureDate.slice(8, 10)}{" "}
            {months[props.departureDate.slice(5, 7)]}
          </h4>
        </div>
        <div className="ticket-child">
          <h5>
            {props.durationHours} Hrs {props.durationMinutes} Mins
          </h5>
          <h5>Runs On</h5>
          <h5>{props.runsOn}</h5>
        </div>
        <div className="ticket-child">
          <h3>{props.arrivalStation}</h3>
          <h4>{props.arrivalTime}</h4>
          <h4>
            {props.arrivalDate.slice(8, 10)}{" "}
            {months[props.arrivalDate.slice(5, 7)]}
          </h4>
        </div>
      </div>
      <div className="ticket-information-30">
        <Button
          variant="outlined"
          style={{
            marginRight: "30px",
            border: "1px solid #EF5350",
            borderRadius: "4px",
            color: "#EF5350",
          }
          
        }
        onClick = {handleClickOpen}

        >
          Cancel Ticket
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          This action cannot be undone. This will permanently cancel the ticket. All the data regarding the ticket will be deleted.    
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO, DON'T CANCEL</Button>
          <Button onClick={cancelTicket} autoFocus>
            YES, CANCEL TICKET  
          </Button>
        </DialogActions>
      </Dialog>
        <Button variant="contained" style={{ backgroundColor: "#03A9F4" }}>
          Print Ticket
        </Button>
      </div>
      
    </div>
  );
}

export default Tickets;
