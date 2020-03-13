import React from 'react';
import logo from './logo.svg';
import './App.css';

import Telemetry from './Telemetry';
import JetGraph from './JetGraph';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Telemetry />
      <JetGraph />
    </div>
  );
}

export default App;
