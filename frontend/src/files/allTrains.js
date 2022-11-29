import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./files.css";
import { useState } from "react";

export default function AllTrain() {
    const columns = [
        { field: "id", headerName: "Train ID", type: "number", width: 100 },
        { field: "trainname", headerName: "Train Name", width: 150 },
        {
          field: "runson",
          headerName: "Runs On",
          width: 130,
        },
        {
          field: "totalseats",
          headerName: "Total Seats",
          type: "number",
          width: 150,
        },
        {
          field: "starttime",
          headerName: "Start Time",
          type: "date",
          width: 140,
        },
      ];

    const [rows, setRows] = useState([]);

    const getAllTrains = async () => {
        try {
            const response = await fetch("http://localhost:5050/allTrains", {
              method: "POST",
              headers: { "Content-Type": "application/json" }, 
            });
            //console.log(response);
            const res = await response.json();
            //console.log(res);
            for(var i = 0; i < res.allTrainsData.length; i++){
              res.allTrainsData[i]["id"] = res.allTrainsData[i].trainid ;
            }
            //console.log(response.allTrainsData);
            //const res = await response.json();
            console.log(res);
            setRows(res.allTrainsData);
            // rws = res;
            // const a = res.allTrainsData;
            // console.log(typeof(a.allTrainsData));
            // console.log((res.allTrainsData));
            // setRows(res.allTrainsData);
            
          } catch (err) {
            console.log(err);
          }
    }
    React.useEffect(() => {
        getAllTrains();
    }, []);
  return (
    <div className="datagrid-containter">
      <br />
      <h1>All Trains</h1>
      <br />
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
