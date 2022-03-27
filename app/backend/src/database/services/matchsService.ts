import Clubs from '../models/Club';
import Match from '../models/Matchs';

export default class MatchService {
  static async getAllMatchs() {
    const getAllMatchs = await Match.findAll({ include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ] });

    if (getAllMatchs.length === 0) return { message: 'Matchs not found' };

    return getAllMatchs;
  }
}
