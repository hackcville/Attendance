import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Studying = props => {
  return (
    <div className="center">
      <h1>Are you currently involved in HackCville?</h1>
      <Link className="classLink" to="/studying">
        Yep!
      </Link>
      <a className="classLink" href="https://airtable.com/shrp2LKBFAjCsYJjv">
        Nope!
      </a>
    </div>
  );
};

export default Studying;
