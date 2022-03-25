import Clubs from '../models/Club';

export default class ClubsService {
  static async getAllClubs() {
    const allClubs = await Clubs.findAll();

    if (allClubs.length === 0) return { message: 'Clubs not found' };

    return allClubs;
  }

  static async findById(id: number) {
    const findClub = await Clubs.findOne({ where: { id } });

    if (!findClub) return { message: 'Club not found' };

    return findClub;
  }
}
