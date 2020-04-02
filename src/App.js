import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './images/logo192.png';
import './App.css';

import Navigation from './components/Navbar'
import Telemetry from './components/Telemetry';
import JetGraph from './components/JetGraph';
import LogControl from './components/LogControl';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Switch>
              <Route exact path='/telemetry' component={Telemetry} />
              <Route path='/graphs' component={JetGraph} />
              <Route path='/logs' component={LogControl} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
