import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import Board from './Board.js';

class Looper extends React.Component {
    render() {
      return (
        <div className="looper">
          <div className="looper-board">
            <Board />
          </div>
          <div className="looper-info">
            <div>{}</div>
            <ol>{}</ol>
          </div>
        </div>
      );
    }
  }
  export default Looper;