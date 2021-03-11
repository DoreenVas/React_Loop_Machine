import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import Square from './Square.js';
import {audios} from './audio-files/mapper.js'

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(false), //true of false in each square depending whether clicked
        isPlayClicked: false, //play button clicked or not
      };
    }

    handleClick(i) {
      const audio = audios[i];
      //making sure the audio is in a loop
      audio.addEventListener('ended', () => audio.play(), false);

      const squares = this.state.squares.slice();
      if(this.state.squares[i] == false && this.state.isPlayClicked == true){ //play is clicked and button is on
        squares[i] = true;
        audio.play();
      }
      else if(this.state.squares[i] == false){ //button is on for next "play" 
        squares[i] = true;
      }
      else if(this.state.isPlayClicked == false){
        squares[i] = false;
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

    handlePlayClick(){
        if(this.state.isPlayClicked == false){ //the user clicked play
            for(let i=0;i<this.state.squares.length;i++){
                if(this.state.squares[i]==true){
                    audios[i].play();
                }
            }
        }else{ //the user clicked stop
            for(let i=0;i<this.state.squares.length;i++){
                if(this.state.squares[i]==true){
                    audios[i].pause();
                }
            }
        }
        this.setState({
            isPlayClicked: !this.state.isPlayClicked,
        });
    }

    renderPlay(){
        let status;
        if (this.state.isPlayClicked == false) {
            status = 'PLAY';
        } else {
            status = 'STOP';
        }
        return(
            <button className="button" onClick={()=>this.handlePlayClick()}>
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