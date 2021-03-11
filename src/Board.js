import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import Square from './Square.js';
import {audios} from './audio-files/mapper.js'

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(false),
        isPlayClicked: false,
      };
    }

    handleClick(i) {
      const audio = audios[i];
      audio.addEventListener('ended', () => audio.play(), false);
      const squares = this.state.squares.slice();
      if(this.state.squares[i] == false){
        squares[i] = true;
        audio.play();
      }
      else{
        squares[i] = false;
        audio.pause();
      }
      this.setState({
          squares: squares,
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

    renderPlay(){
        let status;
        if (this.isPlayClicked == false) {
            status = 'PLAY';
        } else {
            status = 'STOP';
        }
        return(
            <button className="button" onClick={()=>!this.isPlayClicked}>
                {status}
            </button>
        );
    }
  
    render() {
  
      return (
        <div>
          <div className="status">{'WELCOME TO THE LOOP MACHINE!'}</div>
          <div>{this.renderPlay()}</div>
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