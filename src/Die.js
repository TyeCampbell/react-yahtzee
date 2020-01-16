import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() { 
   this.props.toggleLocked(this.props.idx);
  }

  render() {

    let dieClass;
    let rollingClass;
    
    if (this.props.locked) {
      dieClass = " Die-locked "
    }

    if (!this.props.locked && this.props.isRolling) {
      rollingClass = " Die-rolling "
    }

    const dieTextArray = ["one", "two", "three", "four", "five", "six"];
    const dieIcon = " Die " + dieClass + rollingClass + " fas fa-dice-" + dieTextArray[this.props.val - 1]; 

    return (
      // <button
      //   className={"Die"}
      //   style={{ backgroundColor: this.props.locked ? "grey" : "black" }}
      //   onClick={this.handleClick}
      // >
      //   {this.props.val}
       
      // </button> 

      <i 
        className={dieIcon}
        onClick={this.handleClick}
      >
      </i>
    );
  }
}

export default Die;
