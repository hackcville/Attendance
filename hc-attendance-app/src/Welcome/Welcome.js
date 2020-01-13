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
            <h1>What brings you in today?</h1>
            <div className="linkContainer">
                {this.state.courses.map((item)=>{
                    return (
                    <Link key={item.id} className="classLink" to={{pathname: "/" + item.fields["Course Title"], state: item}}>
                        {item.fields["Course Title"]}
                    </Link>)
                })}
                {this.state.events.map((item)=>{
                    return( 
                        <Link key={item.id} className="classLink" to={{pathname: "/" + item.fields["Course Title"],state: item}}>
                            {item.fields["Course Title"]}
                        </Link>)
                })}
                <Link key={666} className="classLink" to="/studying-sign-in">
                    Studying
                </Link>
                <Link key={999} className="classLink" to="/check-ins">
                    Check-Ins
                </Link>
            </div>
        </div>)}
}