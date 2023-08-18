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
    setMatches(matches) {
        this.matches = matches;
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
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
    getLeaderboard() {
        const teamsData = {};

        for (const match of this.getMatches()) {
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
    }
    
    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        const response = await fetch("http://localhost:3001/api/v1/getAllMatches", {
        headers: {'Authorization': 'Bearer YuHBdSlDXY000xa8IlCm7Qgq4_s'}
      });
        const data = await response.json();
        this.setMatches(data.matches);
    }    
}

export default LeagueService;


