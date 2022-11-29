import React from "react";

import "../files.css";
import "./pnrsearch.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Pnrsearch() {
  return (
    <div className="pnrsearch">
      <div className="flex-child">
        <h2>Find My PNR</h2>
        <form>
          <div className="pnr-for-flex">
            <div className="pnr-for-flex-child-1">
              <TextField required id="outlined-required" label="PNR Enquiry" />
            </div>
            <div className="pnr-for-flex-child-3">
              <Button style={{ width: 100 }} type="submit" variant="contained">
                ENQUIRE
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-child">{/* Map goes here */}</div>
    </div>
  );
}

export default Pnrsearch;
