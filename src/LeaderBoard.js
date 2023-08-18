import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './leaderboard.css';

const LeaderBoard = () => {
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

    function getLeaderboard(matches) {
        const teamsData = {};
      
        for (const match of matches) {
          const { homeTeam, awayTeam, matchPlayed, homeTeamScore, awayTeamScore } = match;
      
          if (!teamsData[homeTeam]) {
            teamsData[homeTeam] = {
              teamName: homeTeam,
              matchesPlayed: 0,
              goalsFor: 0,
              goalsAgainst: 0,
              points: 0,
            };
          }
      
          if (!teamsData[awayTeam]) {
            teamsData[awayTeam] = {
              teamName: awayTeam,
              matchesPlayed: 0,
              goalsFor: 0,
              goalsAgainst: 0,
              points: 0,
            };
          }
      
          if (matchPlayed) {
            teamsData[homeTeam].matchesPlayed++;
            teamsData[homeTeam].goalsFor += homeTeamScore;
            teamsData[homeTeam].goalsAgainst += awayTeamScore;
      
            teamsData[awayTeam].matchesPlayed++;
            teamsData[awayTeam].goalsFor += awayTeamScore;
            teamsData[awayTeam].goalsAgainst += homeTeamScore;
      
            if (homeTeamScore > awayTeamScore) {
                teamsData[homeTeam].points += 3;
            } else if (homeTeamScore === awayTeamScore) {
                teamsData[homeTeam].points += 1;
                teamsData[awayTeam].points += 1;
            } else {
                teamsData[awayTeam].points += 3;
            }
          }
        }
        const sortedTeamData = Object.values(teamsData).sort((a, b) => {
            if (a.points !== b.points) {
              return b.points - a.points; // Sort by points descending
            }
            
            if ((a.goalsFor - a.goalsAgainst) !== (b.goalsFor - b.goalsAgainst)) {
                return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst); // Sort by goals difference descending
              }

            if (a.goalsFor !== b.goalsFor) {
              return b.goalsFor - a.goalsFor; // Sort by goals scored descending
            }
        
            return a.teamName.localeCompare(b.teamName); // Sort alphabetically
          });
      
        return Object.values(sortedTeamData);
      };

    const rows = state && getLeaderboard(state).map((item, index) => {
        return (
          <div className="tablerow_leaderboard" key={index}>
            <div className="teamLeaderboard">
                {<img src={`https://flagsapi.codeaid.io/${item.teamName}.png`} alt="countryflag"/>}
                <b>{item.teamName}</b>
            </div>
            <div className='scores'>
                <p>{item.matchesPlayed}</p>
                <p className='goals'>{item.goalsFor}</p>
                <p className='goals'>{item.goalsAgainst}</p>
                <p className='goal_difference'>{item.goalsFor - item.goalsAgainst}</p>
            </div>
            <div className='points'>
                <p>{item.points}</p>
            </div>
          </div>
        );
      });

    return (
        <div>
            <h1>League Standings</h1>
            <div className="header_main">
                <p className="header_teamname">Team Name</p>
                <div className="header_scores">
                    <p>MP</p>
                    <p className='goals'>GF</p>
                    <p className='goals'>GA</p>
                    <p className='goal_difference'>GD</p>
                </div>
                <p className='header_points'>Points</p>
            </div>
            <div className="main">{rows}</div>
        </div>
    );
};
 
export default LeaderBoard;
