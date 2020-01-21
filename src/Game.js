import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      isRolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        upperBonus: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  roll(evt) {

    // roll dice whose indexes are in reroll
    this.setState({isRolling: true});

    setTimeout(() => {
      this.setState(st => ({
        dice: st.dice.map((d, i) =>
          st.locked[i] ? d : Math.ceil(Math.random() * 6)
        ),
      }));
    }, 100)

    setTimeout(() => {
      this.setState(st => ({
        isRolling: false,
        locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
        rollsLeft: st.rollsLeft - 1,
      }));

    }, 1000);

  }

  addUpperScores(){
    const score = this.state.scores
    const upperScores = [score.ones, score.twos, score.threes, score.fours, score.fives, score.sixes ]; 
    let totalUpperScore = 0; 

    upperScores.forEach(idx => {
      if(idx !== undefined) {
        totalUpperScore += idx
      }
    })

    return totalUpperScore;
  }

  // Checks to see if game is over based on all the scores being filled in
  isGameOver() {
    const scores = Object.values(this.state.scores)
    
    return scores.every( idx => idx !== undefined)
  }

  tallyCurrentScore() {
    const scores = Object.values(this.state.scores)
    let totalScore = 0; 

    scores.forEach(idx => {
      if (idx !== undefined) {
        totalScore += idx
      }
    })
    return totalScore
  }

  newGame() {
    this.setState({
      rollsLeft: NUM_ROLLS, 
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        upperBonus: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    })
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if(this.state.rollsLeft !== 0) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    // only allows an update to the score card if the vaule has not yet been set. 
    if (this.state.scores[rulename] === undefined) {
      this.setState(st => ({
        scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false)
      }));
    
    // add in bonus score for upper section if score is 63 or greater
    if (this.addUpperScores() >= 63 ) {
        this.setState(st => ({
          scores: { ...st.scores, upperBonus: 35},
        }));
      }  

      this.roll();
    }
  }

  componentDidUpdate() {
    console.log(this.addUpperScores())
  }

  render() {
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              toggleLocked={this.toggleLocked}
              isRolling={this.state.isRolling}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={this.state.isRolling || this.state.locked.every(x => x)}
                onClick={this.roll}
              >
                {this.state.rollsLeft} Rolls Left
              </button>
            </div>
          </section>
        </header>

        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
        
        <footer className="Game-footer">   
          <h2 className="Game-score">{this.isGameOver() ? 'Final Score: ' : 'Current Score: '}{this.tallyCurrentScore()} </h2>

        </footer>
      </div>
    );
  }
}

export default Game;
