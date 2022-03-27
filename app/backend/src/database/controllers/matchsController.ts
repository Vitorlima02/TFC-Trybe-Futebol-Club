import { Request, Response } from 'express';
import MatchService from '../services/matchsService';
import StatusCode from '../middlewares/statusCode';

export default class MatchController {
  static async getAllMatchs(_req: Request, res: Response) {
    const allMatchs = await MatchService.getAllMatchs();

    if (!allMatchs) return res.status(StatusCode.INVALIDREQ).json({ message: 'Matchs not found' });

    return res.status(StatusCode.OK).json(allMatchs);
  }
}
