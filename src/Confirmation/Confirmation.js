import React from "react";
import { Link } from "react-router-dom";
import Airtable from "airtable";
import "../App.css";

const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY; // airtable api key from .env file



export default class Confirmation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pageTitle:"Sign-in confirmed, Thank you!"
      };

    }

    timeout = () =>{
        setTimeout(()=>{this.props.history.push({pathname: "/"})}, 7000)
    }

    componentDidMount() {
        this.base = new Airtable({ apiKey: API_KEY }).base("appG1EnlhIeoSYkPG");
        this.timeout()
      }

      render() {
          return(
            <div style={{display:"flex", flex:1}}>
              <div style={{display:"flex", flexDirection:"column",justifyContent:"center"}}>
              <h1>{this.state.pageTitle}</h1>
             
              <Link className="returnLink" to="/">
                Return to Home
              </Link>
              </div>
            </div>
          )
          
      }

}
