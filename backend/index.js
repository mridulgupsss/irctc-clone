const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./connect");
const { response } = require("express");
const schedule = require('node-schedule');

app.use(cors());
app.use(express.json());

const weekday={
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
};

function getNextDay(date = new Date(), day) {
    const dateCopy = new Date(date.getTime());
  
    const next = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - dateCopy.getDay() + day) % 7 || 7),
      ),
    );
  
    return next;
  }


const pricePerMinute=2;
function getTime(dh, dm){
    let time="";
    if(dh<10){
        time = time + "0" + String(dh)+":";
    }
    else{
        time = time + String(dh)+":";
    }
    if(dm<10){
        time = time + "0" + String(dm)+":00";
    }
    else{
        time = time + String(dm)+":00";
    }
    return time;
}

app.post("/register", async(req, res) =>{
    try {
        req=req.body;
        console.log(req);   
        const newUser = await pool.query(
            "INSERT INTO Users (FirstName, LastName, Email, ContactNo, Password) VALUES ($1, $2, $3, $4, $5)",
            [req.fname.toLowerCase(), req.lname.toLowerCase(), req.email, req.contactNo, req.Password]
        );
        res.json({created: true});
    } catch (err) {
        res.json({created: false});
    }
});

app.post("/login", async(req, res) =>{
    try {
        req=req.body;
        console.log(req);   
        let User = await pool.query(
            "SELECT * FROM USERS WHERE EMAIL=$1",
            [req.email]
        );
        User=User.rows[0];
        if(User.length == 0){
            res.json({success: false});
        }
        else{
            if(User.password == req.Password){
                let obj={success: true,
                    userId: User.userid
                }
                res.json(obj);
            }
            else{
                res.json({success: false});
            }
        }
    } catch (err) {
        res.json({success: false});
    }
});

app.post("/allTrains", async(req, res) =>{
    try {
        req=req.body;
        console.log(req);   
        let allTrainsData = await pool.query(
            "SELECT * FROM Trains;"
        );
            //console.log(allTrainsData.rows);
        allTrainsData = allTrainsData.rows;
            //console.log(allTrainsData); 
            res.json({allTrainsData})
    } catch (err) {
        res.json({success: false});
    }
});


app.post("/allBookings", async(req, res) =>{
    try {
        req=req.body;
        console.log(req);   
        let allBookingsData = await pool.query(
            "SELECT * FROM Tickets;"
        );
        allBookingsData = allBookingsData.rows; 
        res.json({allBookingsData})
    } catch (err) {
        res.json({success: false});
    }
});


app.post("/changePasswords", async(req, res) =>{
    try {
        req=req.body;
        console.log(req);   
        let User = await pool.query(
            "SELECT Password FROM USERS WHERE USERID=$1",
            [req.userId]
        );
        User=User.rows[0];
        console.log(User);
        if(User.length == 0){
            res.json({success: false});
        }
        else{
            if(User.password == req.oldPassword){
                let change = await pool.query(
                    "UPDATE USERS SET PASSWORD = $1 WHERE USERID = $2",
                    [req.newPassword, req.userId]
                );
                res.json({success: true});
            }
            else{
                res.json({success: false});
            }
        }
    } catch (err) {
        console.log(err);
        res.json({success: false});
    }
});

app.post("/adminLogin", async(req, res) =>{
    try {
        req=req.body;
        console.log(req);   
        let User = await pool.query(
            "SELECT * FROM ADMINS WHERE ADMINEMAIL=$1",
            [req.email]
        );
        User=User.rows[0];
        if(User.length == 0){
            res.json({success: false});
        }
        else{
            if(User.password == req.Password){
                let obj={success: true,
                    adminId: User.adminid
                }
                res.json(obj);
            }
            else{
                res.json({success: false});
            }
        }
    } catch (err) {
        res.json({success: false});
    }
});

app.post("/getTrains", async(req, res) =>{
    
    let trainDetails = [];
    try {
        req=req.body;
        console.log(req);
        let trains = await pool.query(
            "SELECT DEPARTURE.TRAINID AS TRAINID, DEPARTURE.ROUTEID AS ROUTEID, DEPARTURE.CURRENTSTATION  AS DEPT, ARRIVAL.CURRENTSTATION AS ARR, to_char(DEPARTURE.CURRENTDATE, 'YYYY-MM-DD') AS DEPARTUREDATE, to_char(ARRIVAL.CURRENTDATE, 'YYYY-MM-DD') AS ARRIVALDATE, ARRIVAL.TIMEFROMSTART-DEPARTURE.TIMEFROMSTART AS DURATION, ARRIVAL.TIMEFROMSTART AS ARRIVALTIME, DEPARTURE.TIMEFROMSTART AS DEPARTURETIME FROM ROUTES AS DEPARTURE INNER JOIN ROUTES AS ARRIVAL ON (DEPARTURE.ROUTEID=ARRIVAL.ROUTEID AND DEPARTURE.TRAINID=ARRIVAL.TRAINID) WHERE DEPARTURE.CURRENTSTATION=$1 AND ARRIVAL.CURRENTSTATION=$2 AND ARRIVAL.TIMEFROMSTART>DEPARTURE.TIMEFROMSTART AND DEPARTURE.CURRENTDATE=$3;",
            [req.departure.toLowerCase(), req.arrival.toLowerCase(), req.date]
        );
        trains=trains.rows;
        //console.log(trains);
        for(let i=0;i<trains.length;i++){
            let currenTrain = await pool.query(
                "SELECT * FROM TRAINS WHERE TRAINID=$1;",
                [trains[i].trainid]
            );
            let remainingSeats = await pool.query(
                "SELECT MIN(REMAININGSEATS) FROM ROUTES WHERE TRAINID=$1 AND ROUTEID=$2 AND TIMEFROMSTART>=$3 AND TIMEFROMSTART<$4;",
                [trains[i].trainid, trains[i].routeid, trains[i].departuretime, trains[i].arrivaltime]
            );
            remainingSeats=remainingSeats.rows[0];
            currentTrain=currenTrain.rows[0];
            //console.log(currentTrain);
            let h=parseInt((currentTrain.starttime).slice(0, 3)), m=parseInt((currentTrain.starttime).slice(3,5));
            let dh=(h+Math.floor(trains[i].departuretime/60))%24, dm=(m+trains[i].departuretime%60)%60;
            dh+=Math.floor((m+trains[i].departuretime%60)/60);
            let departureTime = getTime(dh, dm);
            dh=(h+Math.floor(trains[i].arrivaltime/60))%24;
            dm=(m+trains[i].arrivaltime%60)%60;
            let arrivalTime = getTime(dh, dm);
            trainDetails.push({
                trainid: parseInt(trains[i].trainid),
                departure: trains[i].dept,
                arrival: trains[i].arr,
                departureDate: trains[i].departuredate,
                arrivalDate: trains[i].arrivaldate,
                durationHours: Math.floor(trains[i].duration/60),
                durationMinutes: trains[i].duration%60,
                price: trains[i].duration*pricePerMinute,
                trainName: currentTrain.trainname,
                runsOn: currentTrain.runson,
                remainingSeats: remainingSeats.min,
                arrivalTime: arrivalTime,
                departureTime: departureTime,
                routeId: parseInt(trains[i].routeid)
            })
        }
        console.log(trainDetails);
        res.json(trainDetails);
    } catch (err) {
        res.json(trainDetails);
    }

});


app.post("/getRoute", async(req, res) =>{
    let details = {
        flag : false
    };
    try {
        req=req.body;
        req.tID=parseInt(req.tID);   
        let route = await pool.query(
            "SELECT CURRENTSTATION, TIMEFROMSTART FROM ROUTES WHERE TRAINID=$1 AND ROUTEID IN (SELECT MIN(ROUTEID) FROM ROUTES) ORDER BY TIMEFROMSTART;",
            [req.tID]
        );
        let startSt = await pool.query(
            "SELECT CURRENTSTATION FROM ROUTES WHERE TRAINID=$1 AND TIMEFROMSTART IN (SELECT MIN(TIMEFROMSTART) FROM ROUTES);",
            [req.tID]
        );
        console.log(startSt);
        startSt=startSt.rows[0].currentstation;
        console.log(startSt);
        let endSt = await pool.query(
            "SELECT CURRENTSTATION FROM ROUTES WHERE TRAINID=$1 AND TIMEFROMSTART IN (SELECT MAX(TIMEFROMSTART) FROM ROUTES);",
            [req.tID]
        );
        endSt=endSt.rows[0].currentstation;
        console.log(endSt);
        let train = await pool.query(
            "SELECT * FROM TRAINS WHERE TRAINID=$1;",
            [req.tID]
        );
        train=train.rows[0];
        route=route.rows;
        console.log(route);
        console.log(train);
        console.log(startSt);
        console.log(endSt);
        details = {
            trainId: req.tID,
            trainName: train.trainname,
            startStation: startSt,
            destinationStation: endSt,
            runsOn: train.runson,
            stations: [],
            flag: true
        }
        let h=parseInt((train.starttime).slice(0, 3)), m=parseInt((train.starttime).slice(3,5));
        for(let i=0;i<route.length;i++){
            let dh=(h+Math.floor(route[i].timefromstart/60))%24, dm=(m+route[i].timefromstart%60)%60;
            dh+=Math.floor((m+route[i].timefromstart%60)/60);
            let arrivalTime = getTime(dh, dm);
            m+=10;
            dh=(h+Math.floor(route[i].timefromstart/60))%24
            dm=(m+route[i].timefromstart%60)%60;
            dh+=Math.floor((m+route[i].timefromstart%60)/60);
            let departureTime = getTime(dh, dm);

            details.stations.push({
                stationName: route[i].currentstation,
                arrivalTime: arrivalTime,
                departureTime: departureTime
            })
        }
        console.log(details);
        res.json(details);
    } catch (err) {
        console.log(err);
        res.json(details);
    }
});


app.post("/deleteTrain", async(req, res) =>{
    try { 
        console.log(req.body);
        const newUser = await pool.query(
            "DELETE FROM TRAINS WHERE TRAINID=$1 RETURNING *;",
            [req.body.trainId]
        );
        if(newUser.rows.length===0){
            res.json({created: false});  
        }
        else{
            res.json({created: true});  
        }
    } catch (err) {
        res.json({created: false});
    }
});

app.post("/deleteTicket", async(req, res) =>{
    try {
        console.log(req.body);  
        const newUser = await pool.query(
            "DELETE FROM TICKETS WHERE TICKETID=$1;",
            [req.body.ticketId]
        );
        res.json({created: true});
    } catch (err) {
        res.json({created: false});
    }
});

app.post("/getBookings", async(req, res) =>{
    req=req.body;
    console.log(req);
    let obj = [];
    try {  
        let tickets = await pool.query(
            "SELECT * FROM TICKETS WHERE USERID=$1",
            [req.id]
        );
        tickets=tickets.rows;
        console.log(tickets);
        for(let i=0;i<tickets.length;i++){
            let train = await pool.query(
                "SELECT TRAINNAME, RUNSON, STARTTIME  FROM TRAINS WHERE TRAINID=$1",
                [tickets[i].trainid]
            );
            train=train.rows[0];   
            console.log(train);
            let stationDetails = await pool.query(
                "SELECT to_char(DEPARTURE.CURRENTDATE, 'YYYY-MM-DD') AS DEPARTUREDATE, to_char(ARRIVAL.CURRENTDATE, 'YYYY-MM-DD') AS ARRIVALDATE, ARRIVAL.TIMEFROMSTART-DEPARTURE.TIMEFROMSTART AS DURATION, ARRIVAL.TIMEFROMSTART AS ARRIVALTIME, DEPARTURE.TIMEFROMSTART AS DEPARTURETIME FROM ROUTES AS DEPARTURE INNER JOIN ROUTES AS ARRIVAL ON (DEPARTURE.ROUTEID=ARRIVAL.ROUTEID AND DEPARTURE.TRAINID=ARRIVAL.TRAINID) WHERE DEPARTURE.CURRENTSTATION=$1 AND ARRIVAL.CURRENTSTATION=$2 AND ARRIVAL.ROUTEID=$3",
                [tickets[i].sourcestation, tickets[i].destinationstation, tickets[i].routeid]
            );
            //console.log(stationDetails.rows);
            stationDetails = stationDetails.rows[0];
            let h=parseInt((train.starttime).slice(0, 3)), m=parseInt((train.starttime).slice(3,5));
            let dh=(h+Math.floor(stationDetails.departuretime/60))%24, dm=(m+stationDetails.departuretime%60)%60;
            dh+=Math.floor((m+stationDetails.departuretime%60)/60);
            let departureTime = getTime(dh, dm);
            dh=(h+Math.floor(stationDetails.arrivaltime/60))%24;
            dm=(m+stationDetails.arrivaltime%60)%60;
            let arrivalTime = getTime(dh, dm);
            
            obj.push({
                trainName: train.trainname,
                trainId: tickets[i].trainid,
                noOfPassengers: tickets[i].noofpassenger,
                departureStation: tickets[i].sourcestation,
                departureTime: departureTime,
                departureDate: stationDetails.departuredate,
                durationHours: Math.floor(stationDetails.duration/60),
                durationMinutes: stationDetails.duration%60,
                runsOn: train.runson,
                arrivalStation: tickets[i].destinationstation,
                arrivalTime: arrivalTime,
                arrivalDate: stationDetails.arrivaldate,
                ticketId: tickets[i].ticketid
            })

        }
        console.log(obj);
        // trainName=trainName.rows;
        // console.log(tickets);
        res.json(obj);
    } catch (err) {
        res.json(obj);
    }
});

app.post("/bookTicket", async(req, res) =>{
    try {
        req=req.body;
        console.log(req.passengers);  
        const newTicket = await pool.query(
            "INSERT INTO Tickets (UserID, RouteID, TrainID, SourceStation, DestinationStation, Price, Email, ContactNo, NoOfPassenger) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning TicketId;",
            [req.userId, req.routeId, req.trainId, req.sourceStation.toLowerCase(), req.destinationStation.toLowerCase(), req.price , req.email, req.contactno, req.passengers.length]
        );
        console.log(newTicket.rows[0]);
        let ticketId=parseInt(newTicket.rows[0].ticketid);
        console.log(ticketId);
        for(let i=0;i<req.passengers.length;i++){
            const newPassenger = await pool.query(
                "INSERT INTO Passengers (TicketID, Name, Age, Gender) VALUES($1, $2, $3, $4);",
                [ticketId, req.passengers[i].name.toLowerCase(), req.passengers[i].age, req.passengers[i].gender]
            );
        }
        
        const updateRemainingSeats = await pool.query(
            "UPDATE Routes SET RemainingSeats = (RemainingSeats - $1) WHERE TimefromStart >= (SELECT TimefromStart FROM Routes WHERE CurrentStation = $2 AND RouteID = $4 AND TrainID = $5) AND TimefromStart < (SELECT TimefromStart FROM Routes WHERE CurrentStation = $3 AND RouteID = $4 AND TrainID = $5) AND RouteID = $4 AND TrainID = $5;",
            [req.passengers.length, req.sourceStation.toLowerCase(), req.destinationStation.toLowerCase(), req.routeId, req.trainId]
        );
        
        res.json({created: true});
    } catch (err) {
        res.json({created: false});
        console.log(err);
    }
});


app.post("/addTrain", async(req, res) =>{
    req=req.body;
    console.log(req.runson);
    console.log(weekday[req.runson]);
    let d1=getNextDay(new Date(), weekday[req.runson]), d2=getNextDay(d1, weekday[req.runson]);
    try {
        console.log(req);
        let maxRouteId = await pool.query(
            "SELECT MAX(ROUTEID) FROM ROUTES;",
            []
        );
        maxRouteId=maxRouteId.rows[0];
        console.log(maxRouteId);
        let newTrain = await pool.query(
            "INSERT INTO Trains (TrainName, RunsOn, TotalSeats, StartTime) VALUES($1, $2, $3, $4) returning TrainID;",
            [req.trainName.toLowerCase(), req.runson.toLowerCase(), req.totalseats, req.starttime]
        );
        newTrain=newTrain.rows[0];
        for(let i=0;i<req.routes.length;i++){
            const newRoute = await pool.query("INSERT INTO Routes (TrainID, CurrentStation, RemainingSeats, TimefromStart, CurrentDate, RouteID) VALUES($1, $2, $3, $4, $5, $6);",
                [newTrain.trainid, req.routes[i].station.toLowerCase(), req.totalseats, req.routes[i].timeFromStart, d1, maxRouteId.max+1]
            );
        }
        for(let i=0;i<req.routes.length;i++){
            const newRoute = await pool.query("INSERT INTO Routes (TrainID, CurrentStation, RemainingSeats, TimefromStart, CurrentDate, routeID) VALUES($1, $2, $3, $4, $5, $6);",
                [newTrain.trainid, req.routes[i].station.toLowerCase(), req.totalseats, req.routes[i].timeFromStart, d2, maxRouteId.max+2]
            );
        }
        
        
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.json({success: false});
    }

});

app.listen(5050, () => {
    console.log("server has started on port 5050");
});