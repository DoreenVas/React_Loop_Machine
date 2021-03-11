import logo from './logo.svg';
import './App.css';
//import './App.html';
import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import Looper from './Looper.js';

function App() {
  return (
    ReactDOM.render(
      <Looper />,
      document.getElementById('root')
    )
  );
}

export default App;
