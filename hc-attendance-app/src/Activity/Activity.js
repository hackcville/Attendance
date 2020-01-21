import React from "react";
import { Link } from "react-router-dom";
import Airtable from "airtable";
import "../App.css";

const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY; // airtable api key from .env file
let studentRecord = [];

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: [],
      record: {},
      weekNum: undefined
    };
    this.handleSubmit.bind(this);
  }

markAttended = () => {
    if (this.state.record){
    const week = "W" + this.state.weekNum
    this.base('Spring 2020 Students').update([{"id" : this.state.record.id,
      "fields": {
          [week] : "Attended"
      }}]
    , (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }};

getWeekNumber = () => {
    const startDate = Date.UTC(2020, 0, 26)
    const today = Date.now()
    let weeksBetween = Math.floor((today - startDate)/604800000) //604,800,000 is the number of milliseconds per week
    return weeksBetween + 1
  };

componentDidMount() {
    this.base = new Airtable({ apiKey: API_KEY }).base("appG1EnlhIeoSYkPG");
    this.setState({weekNum: this.getWeekNumber()})
  }

  render(){
        
    return(

  <div className="linkContainer">
                {this.state.courses.map((item)=>{
                    return (
                    <Link key={item.id} className="classLink" to={{pathname: "/" + item.fields["Course Title"], state: item}}>
                        {item.fields["Course Title"]}
                    </Link>)
                })}
                {this.state.events.map((item)=>{
                    return( 
                        <Link key={item.id} className="classLink" to={{pathname: "/" + item.fields["Marketing Name"],state: item}}>
                            {item.fields["Marketing Name"]}
                        </Link>)
                })}
                <Link key={666} className="classLink" to="/studying-sign-in">
                    Studying
                </Link>
                <Link key={999} className="classLink" to="/lab">
                    Lab
                </Link>
            </div>)}}