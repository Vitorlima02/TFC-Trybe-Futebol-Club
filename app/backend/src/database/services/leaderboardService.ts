import Match from '../models/Matchs';
import Clubs from '../models/Club';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardService {
  static getLeaderboard(matchs: Match[]) {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    matchs.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        totalPoints += 1;
        totalDraws += 1;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        totalLosses += 1;
      }
    });
    return { totalPoints, totalVictories, totalDraws, totalLosses };
  }

  static async formatLeaderboard(id: number, name: string) {
    const teamsMatch = await Match.findAll({ where: { homeTeam: id, inProgress: false } });
    const goals = await this.statusGoals(teamsMatch);
    const result = await this.getLeaderboard(teamsMatch);
    const totalGames = teamsMatch.length;
    const efficiency = Number(((result.totalPoints / (totalGames * 3)) * 100).toFixed(2));

    return {
      name,
      totalPoints: result.totalPoints,
      totalGames,
      totalVictories: result.totalVictories,
      totalDraws: result.totalDraws,
      totalLosses: result.totalLosses,
      ...goals,
      goalsBalance: goals.goalsFavor - goals.goalsOwn,
      efficiency,
    };
  }

  static sortLeaderBoard(result: ILeaderboard[]) {
    result.sort((a, b) => b.goalsOwn - a.goalsOwn);
    result.sort((a, b) => b.goalsFavor - a.goalsFavor);
    result.sort((a, b) => b.goalsBalance - a.goalsBalance);
    result.sort((a, b) => b.totalPoints - a.totalPoints);
    return result;
  }

  static async leaderboardHome() {
    const allClubs = await Clubs.findAll();

    const result = await Promise.all(
      allClubs.map((club) => this.formatLeaderboard(club.id, club.clubName)),
    );
    const sortClubs = this.sortLeaderBoard(result);
    return sortClubs;
  }

  static async statusGoals(matchs: Match[]) {
    let goalsFavor = 0;
    let goalsOwn = 0;

    matchs.forEach((match) => {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    });

    const result = { goalsFavor, goalsOwn };

    return result;
  }
}
