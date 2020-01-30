/*
Welcome.js for HackCville, Inc
By Camille Cooper and Mitch Gillin
January 2020

Initial page for check in app. Allows visiters to HackCville to sign in as a guest or as a member. If the visiter is not
a member, the page is redirected to an online form through Airtable that will collect their info. If the visiter is a
member, the page redirects to log them in.
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
    
        <div className="linkContainer">
          <Link className="classLink" to="/sign-in">
            Sign in
          </Link>
        </div>
      </div>
    );
  }
}
