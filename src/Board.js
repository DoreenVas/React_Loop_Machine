import React from "react";
import Square from "./Square.js";
import {
  future_funk,
  stutter_breakbeats,
  heavy_funk,
  country,
  stompy_slosh,
  groove,
  mp,
  groove2,
  silent_star,
} from "./mapper.js";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(false), //true of false in each square depending whether clicked
      isPlayClicked: false, //play button clicked or not
      waitArray: Array(9).fill(false), // array of all audio waiting for the next loop to join
    };
    this.audios = [
      new Audio(future_funk),
      new Audio(stutter_breakbeats),
      new Audio(heavy_funk),
      new Audio(country),
      new Audio(stompy_slosh),
      new Audio(groove),
      new Audio(mp),
      new Audio(groove2),
      new Audio(silent_star),
    ];
  }

  handleClick(i) {
    const audio = this.audios[i];
    //making sure the audio is in a loop
    audio.addEventListener("ended", () => this.handleLoop(audio), false);
    const squares = this.state.squares.slice();
    const waitArray = this.state.waitArray.slice();
    //play-clicked and button-on
    if (this.state.squares[i] == false && this.state.isPlayClicked == true) {
      var playing = 0;
      for (let j = 0; j < this.state.squares.length; j++) {
        if (this.state.squares[j] == true) {
          playing++;
        }
      }
      //if no audio is playing no need for waiting to sync, play now
      if (playing == 0) {
        audio.play();
      } else {
        waitArray[i] = true;
      }
      squares[i] = true;
      //audio.play();
      //play-not clicked and button-on
    } else if (this.state.squares[i] == false) {
      squares[i] = true;
      //play-not clicked and button-off
    } else if (this.state.isPlayClicked == false) {
      squares[i] = false;
      //play-clicked and button-off
    } else {
      squares[i] = false;
      //the audio was waiting to be played when the button turned to off
      if (this.state.waitArray[i] == true) {
        waitArray[i] = false;
      } else {
        // the audio was playing
        audio.pause();
      }
    }
    this.setState({
      squares: squares,
      waitArray: waitArray,
    });
  }

  handleLoop(audio) {
    audio.play();
    const waitArray = this.state.waitArray.slice();
    //play audios on waitArray
    for (let i = 0; i < this.state.waitArray.length; i++) {
      if (this.state.waitArray[i] == true) {
        this.audios[i].play();
        waitArray[i] = false;
      }
    }
    this.setState({
      waitArray: waitArray,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        key={i}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handlePlayClick() {
    const waitArray = this.state.waitArray.slice();
    //the user clicked play
    if (this.state.isPlayClicked == false) {
      for (let i = 0; i < this.state.squares.length; i++) {
        if (this.state.squares[i] == true) {
          this.audios[i].play();
        }
      }
    } else {
      //the user clicked stop
      for (let i = 0; i < this.state.squares.length; i++) {
        if (this.state.squares[i] == true) {
          this.audios[i].pause();
        }
        waitArray[i] = false;
      }
    }
    this.setState({
      isPlayClicked: !this.state.isPlayClicked,
      waitArray: waitArray,
    });
  }

  renderPlay() {
    let status;
    if (this.state.isPlayClicked == false) {
      status = "PLAY";
    } else {
      status = "STOP";
    }
    return (
      <button className="button" onClick={() => this.handlePlayClick()}>
        {status}
      </button>
    );
  }

  render() {
    return (
      <div>
        <div className="status">{"WELCOME TO THE LOOP MACHINE!"}</div>
        <div className="play-button">{this.renderPlay()}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
