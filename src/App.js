import React from "react";
import { BrowserRouter as Router, Switch, Route }
    from 'react-router-dom';
import Schedule from './Schedule';
import LeaderBoard from './LeaderBoard';
import NotFound from './NotFound';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
       <Router>
          <Header/>
          <Switch>
              <Route exact path='/'><Schedule /></Route>
              <Route path='/schedule'><Schedule /></Route>
              <Route path='/leaderboard'><LeaderBoard /></Route>
              <Route path='*'><NotFound /></Route>
          </Switch>
        </Router>
        <Footer/>
    </div>
  );
}

export default App;
