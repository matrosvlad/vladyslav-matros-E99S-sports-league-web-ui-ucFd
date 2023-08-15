import React from "react";
import { BrowserRouter as Router, Switch, Route }
    from 'react-router-dom';
import Schedule from './Schedule';
import LeaderBoard from './LeaderBoard';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
// import { Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {


  

  return (
    <div className="App">
       <Router>
        <Header/>
          {/* <Switch>
            <Route exact path='/schedule' element={<App />} />
            <Route exact path='/leaderboard' element={<LeaderBoard />} />
          </Switch> */}
          <Switch>
              <Route exact path='/'><Schedule /></Route>
              <Route path='/leaderboard'><LeaderBoard /></Route>
          </Switch>

        </Router>

      <Footer/>
    </div>
  );










  // return (
  //   <div className={style.welcomeMessage}>
  //     Hi there 👋, <br /><br />      
  //     Welcome to your test task. <br /><br />
  //     Before you begin make sure to read the README file from the repository to make sure that your environment is properly set up. <br /><br />
  //     Also please make sure to read the challenge instructions carefully. We advice that you push your source code to the repository frequently to avoid any loss of work.<br />
  //     Once you are ready to submit the work, just go back to the challenge instructions page and click the "Submit Challenge" button.<br /><br />      
  //     Good Luck and Have Fun! 🤞<br /><br /><br /><br />
  //     <em><strong>NOTE:</strong> This page is only a welcome message and you should overwrite this page with the actuall solution implementation.</em>
  //   </div>
  // );
}

export default App;
