import React from "react";
import {Link} from "react-router-dom"
import "../App.css";

export default class SignIn extends React.Component{
        
    constructor(props){
        super(props);
        this.state = {number: []}
    }

    handleNumberClick = (number) =>{
        console.log(number);
        if(this.state.number.length < 10){
            this.setState({
                ...this.state,
                number: [...this.state.number, number]
            })
        }
    }

    handleDelete = () => {
        if(this.state.number.length > 0){
            let newNumber= this.state.number;
            newNumber.pop();
            console.log(newNumber);
            this.setState({
                ...this.state,
                number: newNumber
            })
        }
    }

    render(){
        const displayNumber = this.state.number.join("");
        return(
            <div className="center">
                <h1>Sign in to {this.props.match.params.courseName}</h1>
                <Link className="returnLink" to="/">Return to Selection Page</Link>
                <div>
                    <button className="dialButton" 
                            style={{backgroundColor: "red"}}
                            onClick={()=>{this.handleDelete()}}>X</button>
                    <button className="dialButton" style={{backgroundColor: "green"}}>Submit</button>
                </div>
                <h2 className="numberField"> {displayNumber}</h2>
                <div className="dialButtons">
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(1)}}>1</button>
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(2)}}>2</button>
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(3)}}>3</button>
                </div>
                <div className="dialButtons">
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(4)}}>4</button>
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(5)}}>5</button>
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(6)}}>6</button>
                </div>
                <div className="dialButtons">
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(7)}}>7</button>
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(8)}}>8</button>
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(9)}}>9</button>
                </div>
                <div className="dialButtons">
                    <button className="dialButton" onClick={()=>{this.handleNumberClick(0)}}>0</button>
                </div>
            </div>)
    }
}