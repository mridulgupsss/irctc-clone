import React from "react";
import "./files.css";
import Bookticket from "./components/bookticket";
import Trainsearch from "./components/trainsearch";
import Pnrsearch from "./components/pnrsearch";

function Homepage() {
  return (
    <>
      <Bookticket />
      <Trainsearch />
      <Pnrsearch />
    </>

  );
}

export default Homepage;
