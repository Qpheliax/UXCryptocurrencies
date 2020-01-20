import React from 'react';
import './App.css';
import logo from './img/assets/logo.png';
import Start from './Start/Start';
import Comparison from './Comparison/Comparison';
import Top3 from './Top3/Top3';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';

{/*Navigationssytem med länkar och logotyp*/}
function App() {

  return (

    <Router>
      <div className="App">
        <div className="Nav">
          <div className="navleft">
            <img className="logo" src={logo} alt="logo" />
          </div>
          <div className="navright">
            <NavLink className="Nlink" to="/UXCryptocurrencies" style={{ textDecoration: 'none' }} ><section className="item" >Home</section></NavLink>
            <NavLink className="Nlink" to="/comparison" style={{ textDecoration: 'none' }} ><section className="item" >Cryptocurrencies</section></NavLink>
          </div>
        </div>
        <Route exact path='/UXCryptocurrencies' component={Start} />
        <Route exact path='/comparison' component={Comparison} />
        <Route exact path='/comparison/:id' component={Top3} />

      </div>
    </Router>
  );
}

export default App;