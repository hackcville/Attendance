/*
App.js for HackCville, Inc
By Camille Cooper and Mitch Gillin
January 2020

handles the routes and central organization of the checkin app for courses and events
*/

import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome/Welcome.js"
import SignIn from "./SignIn/SignIn.js"
import Studying from "./Studying/Studying.js"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/studying-sign-in" component={Studying}/> 
          <Route path="/:courseName" component={SignIn} />
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}