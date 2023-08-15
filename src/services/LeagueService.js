/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 */
class LeagueService {    
    
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    
    setMatches(matches) {}




    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches(state) {
        const items = state.matches.map((item, index) => {
            const optionsDate = {year: 'numeric', month: 'numeric', day: 'numeric' };
            const optionsTime = {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Berlin'};
    
            return (
              <div className="tablerow" key={index}>
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
                    <p>{item.homeTeamScore}</p>
                    <p> : </p>
                    <p>{item.awayTeamScore}</p>
                  </div>
                  <div className="awayteam">
                    {<img src={`https://flagsapi.codeaid.io/${item.awayTeam}.png`} alt="countryflag"/>} 
                    <p>{item.awayTeam}</p>
                  </div>
                </div>
              </div>
            );
          });
        return items;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard(data) {
        const teamsData = {};        
        data.forEach(match => {
        const { homeTeam, awayTeam, homeGoals, awayGoals } = match;

        if (!teamsData[homeTeam]) teamsData[homeTeam] = { points: 0, goalsFor: 0, goalsAgainst: 0 };
        if (!teamsData[awayTeam]) teamsData[awayTeam] = { points: 0, goalsFor: 0, goalsAgainst: 0 };

        if (homeGoals > awayGoals) {
        teamsData[homeTeam].points += 3;
        } else if (homeGoals < awayGoals) {
        teamsData[awayTeam].points += 3;
        } else {
        teamsData[homeTeam].points += 1;
        teamsData[awayTeam].points += 1;
        }

        teamsData[homeTeam].goalsFor += homeGoals;
        teamsData[homeTeam].goalsAgainst += awayGoals;
        teamsData[awayTeam].goalsFor += awayGoals;
        teamsData[awayTeam].goalsAgainst += homeGoals;
        });
        return teamsData;
    }
    
    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        
    }    
}

export default LeagueService;


