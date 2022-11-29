import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import './files.css'

export default function AllTrain() {
  const columns = [
    { field: "trainid", headerName: "Train ID", width: 100 },
    { field: "sourcestation", headerName: "Source", width: 150 },
    {
      field: "destinationstation",
      headerName: "Destination",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 130,
    },
    {
      field: "noofpassenger",
      headerName: "No of Passengers",
      type: "number",
      width: 180,
    },
  ];

  const [rows, setRows] = useState([]);

  const getAllBookings = async () => {
    try {
        const response = await fetch("http://localhost:5050/allBookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, 
        });
        //console.log(response);
        const res = await response.json();
        console.log("resoinse here");
        // console.log(res);
        for(var i = 0; i < res.allBookingsData.length; i++){
          res.allBookingsData[i]["id"] = i;
        }
        //console.log(response.allTrainsData);
        //const res = await response.json();
        console.log(res);
        setRows(res.allBookingsData);
        console.log("here");
        console.log(rows);
        // rws = res;
        // const a = res.allTrainsData;
        // console.log(typeof(a.allTrainsData));
        // console.log((res.allTrainsData));
        //setRows(res.allTrainsData);
        
      } catch (err) {
        console.log(err);
      }
}
  React.useEffect(() => {
    getAllBookings();
  }, [] );
  return (
    <div className="datagrid-containter">
        <br/>
        <h1>All Bookings</h1>
        <br/>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={11}
          rowsPerPageOptions={[11]}
        />
      </div>
    </div>
  );
}
