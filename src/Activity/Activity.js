import React from "react";
import { Link } from "react-router-dom";
import Airtable from "airtable";
import "../App.css";

const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY; // airtable api key from .env file

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekNum: undefined,
      courses: [],
      events: []
    };
  }

  markAttended = activity => {
    const week = activity + this.state.weekNum;
    this.base("Spring 2020 Students").update(
      [
        {
          id: this.props.match.params.recordNumber,
          fields: {
            [week]: "Attended"
          }
        }
      ],
      (err, records) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    this.props.history.push("/");
  };

  getWeekNumber = () => {
    var adjustedFirstDay = 20 + this.props.location.state.section[0];
    const startDate = Date.UTC(2020, 0, adjustedFirstDay);
    const today = Date.now();
    let weeksBetween = Math.floor((today - startDate) / 604800000); //604,800,000 is the number of milliseconds per week
    return weeksBetween + 1;
  };

  studied = () => {
    this.base("Spring 2020 Students").update(
      [
        {
          id: this.props.match.params.recordNumber,
          fields: {
            Studying: this.props.location.state.study + 1
          }
        }
      ],
      (err, records) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    this.props.history.push("/");
  };

  async componentDidMount() {
    this.base = new Airtable({ apiKey: API_KEY }).base("appG1EnlhIeoSYkPG");
    const coursesPromise = await fetch(
      "https://api.airtable.com/v0/appG1EnlhIeoSYkPG/Courses?api_key=" + API_KEY
    );
    const eventsPromise = await fetch(
      "https://api.airtable.com/v0/appG1EnlhIeoSYkPG/Events?api_key=" + API_KEY
    );

    const courses = await coursesPromise.json();
    const events = await eventsPromise.json();

    const today = new Date();
    const todayNumber = today.getDay();
    const todayFullDate = today.toISOString().split("T")[0];

    this.setState({
      ...this.state,
      courses: await courses.records.filter(
        course => course.fields["Meeting Day"] === days[todayNumber]
      ),
      events: await events.records.filter(
        event => event.fields.Date === todayFullDate
      ),
      weekNum: this.getWeekNumber()
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome back, {this.props.location.state.name}!</h1>
        <h1>What brings you here today?</h1>
        <div className="linkContainer">
          {this.state.courses.map(item => {
            return (
              <button
                key={item.id}
                className="classLink"
                onClick={() => {
                  this.markAttended("W");
                }}
              >
                {item.fields["Course Title"]}
              </button>
            );
          })}
          {this.state.events.map(item => {
            return (
              <button
                key={item.id}
                className="classLink"
                onClick={() => {
                  this.markAttended(item.fields["Marketing Name"]);
                }}
              >
                {item.fields["Marketing Name"]}
              </button>
            );
          })}
          <button
            className="classLink"
            onClick={() => {
              this.studied();
            }}
          >
            Studying
          </button>
          <button
            className="classLink"
            onClick={() => {
              this.markAttended("L");
            }}
          >
            Lab
          </button>
        </div>
      </div>
    );
  }
}
