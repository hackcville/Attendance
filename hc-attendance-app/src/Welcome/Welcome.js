/*
Welcome.js for HackCville, Inc
By Camille Cooper and Mitch Gillin
January 2020

grabs from Airtable base "HackCville Spring 2020 Course Participants" the courses meeting and events happening on the
given day. It then offers these plus studying and checkins as options for students to sign in. Attendence is tracked
in Airtable.
*/

import React from "react";
import {Link} from "react-router-dom"
import "../App.css";
import "./Welcome.css"

const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            events: []
        }
    }
    
    async componentDidMount(){
        const coursesPromise= await fetch('https://api.airtable.com/v0/appG1EnlhIeoSYkPG/Courses?api_key='+API_KEY);
        const eventsPromise = await fetch('https://api.airtable.com/v0/appG1EnlhIeoSYkPG/Events?api_key='+API_KEY);

        const courses = await coursesPromise.json();
        const events = await eventsPromise.json();

        const today = new Date();
        const todayNumber = today.getDay();
        const todayFullDate = today.toISOString().split("T")[0];

        console.log(events);

        this.setState({
            ...this.state,
            courses:  await courses.records.filter((course)=> course.fields["Meeting Day"] === days[todayNumber]),
            events:  await events.records.filter((event)=> event.fields.Date === todayFullDate)
        })
    }

    render(){
        
        return(
        <div className="center">
            <h1>Welcome to HackCville!</h1>
            <h1>Check in as</h1>
            <div className="linkContainer">
                <Link className="classLink" to="/sign-in">Member</Link>
                <a className="classLink" href="https://airtable.com/shrp2LKBFAjCsYJjv">Guest</a>
            </div>
        </div>)}
}