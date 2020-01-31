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
        upperBonusScore: undefined,
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
    this.isGameOver = this.isGameOver.bind(this);
    this.totalGameScore = this.totalGameScore.bind(this);
    this.newGame = this.newGame.bind(this);
    this.confirmNewGame = this.confirmNewGame.bind(this);
    this.applyUpperScoreBonus = this.applyUpperScoreBonus.bind(this);
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

  // Checks to see if game is over based on all the scores being filled in
  isGameOver() {
    const scores = Object.values(this.state.scores)
    console.log(scores)
    return scores.every( idx => idx !== undefined);
  }

  totalGameScore() {
    const scores = Object.values(this.state.scores)
    let totalScore = 0; 

    scores.forEach(idx => {
      if (idx !== undefined) {
        totalScore += idx
      }
    })
    return totalScore
  }

  confirmNewGame() {
    const startNewGame = window.confirm("End current game and start a new game?");
    if(startNewGame) {
      this.newGame();
    }
  }

  newGame() {    
    this.setState({
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false), 
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        upperBonusScore: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    })

    this.roll();
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
        scores: { ...st.scores, [rulename]: ruleFn(this.state.dice)},
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false)
      }), () => this.applyUpperScoreBonus());
      
      this.roll();
    }
  }

  applyUpperScoreBonus() {
    
    const st = this.state.scores;
    const upperArrayScores = [st.ones, st.twos, st.threes, st.fours, st.fives, st.sixes];
    let totalUpperScore = 0; 
  
    upperArrayScores.forEach(idx => {
      if(idx !== undefined) {
        totalUpperScore += idx
      }
    })

    if(upperArrayScores.every(idx => idx !== undefined)) {
      //if the total is more than 63, apply bonus of 35 otherwise 0
       this.setState(st => ({
        scores: { ...st.scores, upperBonusScore: totalUpperScore >= 63 ? 35 : 0},
      }));
      } 
  }

  //stores state to local storage for future games
  componentDidUpdate() {
    localStorage.setItem('saveDice', JSON.stringify(this.state.dice));
    localStorage.setItem('saveLocked', JSON.stringify(this.state.locked));
    localStorage.setItem('saveRollsLeft', JSON.stringify(this.state.rollsLeft));
    localStorage.setItem('saveScores', JSON.stringify(this.state.scores));
  }

  //retrieve the data from local storage if it exists
  componentDidMount() {
    const savedDice = localStorage.getItem('saveDice');
    const savedLocked = localStorage.getItem('saveLocked'); 
    const savedRollsLeft = localStorage.getItem('saveRollsLeft');
    const savedScores = localStorage.getItem('saveScores');

    if (savedDice !== null) {
      this.setState({
        dice: JSON.parse(savedDice),
        locked: JSON.parse(savedLocked),
        rollsLeft: JSON.parse(savedRollsLeft),
        isRolling: false,
        scores: JSON.parse(savedScores)
      })
    }

  }

  render() {

    let gameState = 
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

    if(this.isGameOver()) {
      gameState = 
      <section>
        <h2>Game Over</h2>
        <p>Your final score: {this.totalGameScore()}!</p>
        <button onClick={this.newGame}>Start New Game?</button>
      </section>
    }


    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>
          {gameState}
        </header>

        <ScoreTable doScore={this.doScore} scores={this.state.scores} isGameOver={this.isGameOver()} totalGameScore={this.totalGameScore()}/>
        
        <footer className='Game-footer'>   
          <button className='Game-NewGame' onClick={this.confirmNewGame}>New Game</button> 
        </footer>
      </div>
    );
  }
}

export default Game;
