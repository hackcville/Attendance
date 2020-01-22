/*
Welcome.js for HackCville, Inc
By Camille Cooper and Mitch Gillin
January 2020

grabs from Airtable base "HackCville Spring 2020 Course Participants" the courses meeting and events happening on the
given day. It then offers these plus studying and checkins as options for students to sign in. Attendence is tracked
in Airtable.
*/

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Welcome.css";

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="center">
        <h1>Welcome to HackCville!</h1>
        <h1>Check in as</h1>
        <div className="linkContainer">
          <Link className="classLink" to="/sign-in">
            Member
          </Link>
          <a
            className="classLink"
            href="https://airtable.com/shrp2LKBFAjCsYJjv"
          >
            Guest
          </a>
        </div>
      </div>
    );
  }
}
