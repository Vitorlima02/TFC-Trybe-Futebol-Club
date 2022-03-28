import Clubs from '../models/Club';
import Match from '../models/Matchs';
import IMatch from '../interfaces/iMatch';

export default class MatchService {
  static async getAllMatchs() {
    const getAllMatchs = await Match.findAll({ include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ] });

    if (getAllMatchs.length === 0) return { message: 'Matchs not found' };

    return getAllMatchs;
  }

  static async addMatchs(data: IMatch) {
    const [homeTeamName, awayTeamName] = await Promise.all([
      Clubs.findOne({ where: { id: data.homeTeam } }),
      Clubs.findOne({ where: { id: data.awayTeam } }),
    ]);

    if (!homeTeamName || !awayTeamName) {
      return { message: 'There is no team with such id!' };
    }

    const addMatch = await Match.create(data);

    if (!addMatch) return { message: 'Match not created' };

    const result = {
      id: addMatch.id,
      homeTeam: addMatch.homeTeam,
      homeTeamGoals: addMatch.homeTeamGoals,
      awayTeam: addMatch.awayTeam,
      awayTeamGoals: addMatch.awayTeamGoals,
      inProgress: addMatch.inProgress,
    };
    return result;
  }

  static async finishMatch(id: number) {
    const match = await Match.findByPk(id);

    if (!match) return { message: 'Match not found' };

    if (match.inProgress === true) {
      match.inProgress = false;
    }

    const result = await match.save();

    return result;
  }
}
