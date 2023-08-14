import React from "react";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {

  const [state, setState] = React.useState([]);
  const getData = () => {
    fetch("http://localhost:3001/api/v1/getAllMatches", {
      headers: {'Authorization': 'Bearer YuHBdSlDXY000xa8IlCm7Qgq4_s'}
    })
      .then((response) => response.json())
      .then((data) => setState(data));
  };

  React.useEffect(() => getData(), []);
  
  const items = state.matches.map((item, index) => {
    return (
      <div className="tablerow" key={index}>
        <div className="date">{item.matchDate}</div>
        <div className="stadium">{item.stadium}</div>

        <div className="teams">
          {<img src={`https://flagsapi.codeaid.io/${item.homeTeam}.png`} alt="countryflag"/>}
          {item.homeTeam}
          {item.homeTeamScore}
          <p> : </p>
          {item.awayTeamScore}
          {<img src={`https://flagsapi.codeaid.io/${item.awayTeam}.png`} alt="countryflag"/>} 
          {item.awayTeam}
        </div>
      </div>
    );
  });
  return (
    <div className="App">
      <Header/>
      <h1>League Schedule</h1>
      <div className="main">{items}</div>
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
