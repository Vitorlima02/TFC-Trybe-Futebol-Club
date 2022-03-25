import { Request, Response } from 'express';
import ClubsService from '../services/clubsService';
import StatusCode from '../middlewares/statusCode';

export default class ClubsController {
  static async getAllClubs(_req: Request, res: Response) {
    const allClubs = await ClubsService.getAllClubs();

    if (!allClubs) {
      return res.status(StatusCode.INVALIDREQ).json({ message: 'Clubs not found' });
    }

    return res.status(StatusCode.OK).json(allClubs);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const convertId = Number(id);

    const findClub = await ClubsService.findById(convertId);

    if (!findClub) {
      return res.status(StatusCode.INVALIDREQ).json({ message: 'Club not found' });
    }

    return res.status(StatusCode.OK).json(findClub);
  }
}
