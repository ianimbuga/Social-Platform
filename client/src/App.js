import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Login, Signup } from './pages/Auth';
import Home from './pages/Home';
import './App.css';


const App = () => (
  <Router>
    <Navbar />
    <div className="app-container">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  </Router>
);

export default App;
