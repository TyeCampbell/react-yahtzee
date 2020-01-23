import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  render() {

    const ruleRowClasses = this.props.additionalClass === undefined ? "RuleRow RuleRow-active" : "RuleRow RuleRow-active " + this.props.additionalClass; 

    return (
      <tr className={ruleRowClasses} onClick={this.props.doScore}>
        <td className="RuleRow-name">{this.props.name}<span className="RuleRow-description"> {this.props.score === undefined ? this.props.description : ''}</span></td>
        <td className="RuleRow-score">{this.props.score}</td>
      </tr>
    )
  }
}

export default RuleRow;