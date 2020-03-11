import React from 'react';
import logo from './logo.svg';
import './App.css';

import Telemetry from './Telemetry';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h2>Live Telemetry</h2> 
      <Telemetry/>
    </div>
  );
}

export default App;
