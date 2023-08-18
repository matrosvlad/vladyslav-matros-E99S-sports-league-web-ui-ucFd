import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Schedule = () => {
    const [state, setMatches] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          // Get access token
          const accessTokenResponse = await axios.get('http://localhost:3001/api/v1/getAccessToken');
          const accessToken = accessTokenResponse.data.access_token;
          
          // Fetch matches with authorization
          const matchesResponse = await axios.get('http://localhost:3001/api/v1/getAllMatches', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          
          setMatches(matchesResponse.data.matches);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, []);


    const getMatches = state && state.map((item, index) => {
        const optionsDate = {year: 'numeric', month: 'numeric', day: 'numeric' };
        const optionsTime = {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Berlin'};
        return (
          <div className="tablerow_schedule" key={index}>
            <div className="datetime">
              <div className="date">{new Date(item.matchDate).toLocaleDateString('de-DE', optionsDate)}</div>
              <div className="time">{new Date(item.matchDate).toLocaleTimeString('de-DE', optionsTime)}</div>
            </div>
            <div className="stadium">{item.stadium}</div>
    
            <div className="teams">
              <div className="hometeam">
                <p>{item.homeTeam}</p>
                {<img src={`https://flagsapi.codeaid.io/${item.homeTeam}.png`} alt="countryflag"/>}
              </div>
              <div className="result">
                <p>{item.matchPlayed ? item.homeTeamScore : '-'}</p>
                <p> : </p>
                <p>{item.matchPlayed ? item.awayTeamScore : '-'}</p>
              </div>
              <div className="awayteam">
                {<img src={`https://flagsapi.codeaid.io/${item.awayTeam}.png`} alt="countryflag"/>} 
                <p>{item.awayTeam}</p>
              </div>
            </div>
          </div>
        );
      });


    return (
        <div>
            <h1>League Schedule</h1>
            <div className="header_main">
                <p className="datetime">Date/Time</p>
                <p className="stadium">Stadium</p>
                <div className="header_teams">
                    <p className="hometeam">Home Team</p>
                    <p className="awayteam">Away Team</p>
                </div>
            </div>
        <div className="main">{getMatches}</div>
        </div>
    );
};
 
export default Schedule;