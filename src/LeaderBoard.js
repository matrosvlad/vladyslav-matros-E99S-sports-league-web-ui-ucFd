import React from 'react';

const LeaderBoard = () => {

    const [state, setState] = React.useState([]);
    const getData = () => {
      fetch("http://localhost:3001/api/v1/getAllMatches", {
        headers: {'Authorization': 'Bearer YuHBdSlDXY000xa8IlCm7Qgq4_s'}
      })
        .then((response) => response.json())
        .then((data) => setState(data));
    };
    
    React.useEffect(() => getData(), []);

    const teamsData = []; 
    state.matches.forEach(match => {
        const { homeTeam, awayTeam, homeTeamScore, awayTeamScore } = match;
    
        let homeTeamIndex = teamsData.findIndex(team => team.name === homeTeam);
        let awayTeamIndex = teamsData.findIndex(team => team.name === awayTeam);
    
        if (homeTeamIndex === -1) {
            teamsData.push({ name: homeTeam, points: 0, goalsFor: 0, goalsAgainst: 0 });
            homeTeamIndex = teamsData.length - 1;
        }
        if (awayTeamIndex === -1) {
            teamsData.push({ name: awayTeam, points: 0, goalsFor: 0, goalsAgainst: 0 });
            awayTeamIndex = teamsData.length - 1;
        }
    
        if (homeTeamScore > awayTeamScore) {
            teamsData[homeTeamIndex].points += 3;
        } else if (homeTeamScore < awayTeamScore) {
            teamsData[awayTeamIndex].points += 3;
        } else {
            teamsData[homeTeamIndex].points += 1;
            teamsData[awayTeamIndex].points += 1;
        }
    
        teamsData[homeTeamIndex].goalsFor += homeTeamScore;
        teamsData[homeTeamIndex].goalsAgainst += awayTeamScore;
        teamsData[awayTeamIndex].goalsFor += awayTeamScore;
        teamsData[awayTeamIndex].goalsAgainst += homeTeamScore;
    });
    console.log(teamsData);



    return (
        <div>
            <h1>League Standings</h1>
            <div className="header_main">
                <p className="datetime">Team Name</p>
                <div className="header_teams">
                    <p>MP</p>
                    <p>GF</p>
                    <p>GA</p>
                    <p>Points</p>
                </div>
            </div>

        </div>
    );
};
 
export default LeaderBoard;
