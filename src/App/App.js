import React from 'react';
import './App.css';
import logo from '../img/assets/logo.png';
import Start from '../Start/Start';
import Com from '../Comparison/Com';
import Top from '../Top/Top';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';

function App() {

  return (
/*
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="left">
            <img className="logo" src={logo} alt="logo" />
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">

            <NavLink className="Nlink" to="/UXCryptocurrencies" ><section className="nav-item nav-link active" >Home</section></NavLink>
              
              <NavLink className="" to="/comparison" ><section className="nav-item nav-link" >Cryptocurrencies</section></NavLink>
              
            </div>
          </div>
        </nav>
        <Route exact path='/UXCryptocurrencies' component={Start} />
        <Route exact path='/comparison' component={Com} />
        <Route exact path='/comparison/:id' component={Top} />
      </div>
    </Router>
*/


    <Router>
      <div className="App">
        <div className="Nav">
          <div className="left">
            <img className="logo" src={logo} alt="logo" />
          </div>
          <div className="right">
            <NavLink className="Nlink" to="/UXCryptocurrencies" ><section className="item" >Home</section></NavLink>
            <NavLink className="Nlink" to="/comparison" ><section className="item" >Cryptocurrencies</section></NavLink>
          </div>
        </div>
        <Route exact path='/UXCryptocurrencies' component={Start} />
        <Route exact path='/comparison' component={Com} />
        <Route exact path='/comparison/:id' component={Top} />

      </div>
    </Router>
    
  );
}
export default App;