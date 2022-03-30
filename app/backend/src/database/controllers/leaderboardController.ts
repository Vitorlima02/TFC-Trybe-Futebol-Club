import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import StatusCode from '../middlewares/statusCode';

export default class LeaderboardController {
  static async leaderboardHome(_req: Request, res: Response) {
    const result = await LeaderboardService.leaderboardHome();

    return res.status(StatusCode.OK).json(result);
  }
}
