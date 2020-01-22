import React from "react";
import { Link } from "react-router-dom";
import Airtable from "airtable";
import "../App.css";

const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY; // airtable api key from .env file
let studentRecord = [];

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: [7, 5, 7, 7, 7, 7, 4, 1, 6, 9],
      record: {}
    };
    this.handleSubmit.bind(this);
  }

  handleNumberClick = number => {
    if (this.state.number.length < 10) {
      this.setState({
        ...this.state,
        number: [...this.state.number, number]
      });
    }
  };

  handleDelete = () => {
    if (this.state.number.length > 0) {
      let newNumber = this.state.number;
      newNumber.pop();
      this.setState({
        ...this.state,
        number: newNumber,
        record: {}
      });
    }
  };

  handleSubmit = () => {
    let recordArray = [];
    if (this.state.number.length === 10) {
      this.base("Spring 2020 Students")
        .select({
          filterByFormula: `{CleanNumber} = "${this.state.number.join("")}"`
        })
        .eachPage((records, fetchNextPage) => {
          records.forEach(record => {
            studentRecord.push(record);
          });
          fetchNextPage();
        })
        .then(() => {
          this.setState({ ...this.state, record: studentRecord[0].id });
          this.props.history.push({
            pathname: "/" + this.state.record,
            state: {
              name: studentRecord[0].fields["First Name"],
              section: studentRecord[0].fields["Course"],
              study: studentRecord[0].fields["Studying"]
            }
          });
        });
      function done(error) {
        console.log(error);
        console.log("Done");
      }
    }
  };

  componentDidMount() {
    this.base = new Airtable({ apiKey: API_KEY }).base("appG1EnlhIeoSYkPG");
  }

  render() {
    const displayNumber = this.state.number.join("");
    return (
      <div className="center">
        <h1>Please enter your phone number to sign in.</h1>
        <Link className="returnLink" to="/">
          Not a member?
        </Link>
        <div>
          <button
            className="dialButton"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              this.handleDelete();
            }}
          >
            X
          </button>
          <button
            className="dialButton"
            style={{ backgroundColor: "green" }}
            onClick={() => {
              this.handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
        <h2 className="numberField"> {displayNumber}</h2>
        <div className="dialButtons">
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(1);
            }}
          >
            1
          </button>
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(2);
            }}
          >
            2
          </button>
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(3);
            }}
          >
            3
          </button>
        </div>
        <div className="dialButtons">
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(4);
            }}
          >
            4
          </button>
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(5);
            }}
          >
            5
          </button>
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(6);
            }}
          >
            6
          </button>
        </div>
        <div className="dialButtons">
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(7);
            }}
          >
            7
          </button>
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(8);
            }}
          >
            8
          </button>
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(9);
            }}
          >
            9
          </button>
        </div>
        <div className="dialButtons">
          <button
            className="dialButton"
            onClick={() => {
              this.handleNumberClick(0);
            }}
          >
            0
          </button>
        </div>
      </div>
    );
  }
}
