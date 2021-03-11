import React, { Component, useState } from "react";
import Board from './Board.js';

function Looper () {
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
  export default Looper;