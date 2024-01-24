import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/records/bp">RecordBPList</Link>
        </li>
        <li>
          <Link to="/records/cardio">RecordCardioList</Link>
        </li>
        <li>
          <Link to="/records/squat">RecordSquatList</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
