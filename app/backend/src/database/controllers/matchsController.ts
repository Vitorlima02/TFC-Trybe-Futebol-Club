import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import MatchService from '../services/matchsService';
import StatusCode from '../middlewares/statusCode';
import Clubs from '../models/Club';

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
const errorEqualsTeams = 'It is not possible to create a match with two equal teams';

export default class MatchController {
  static async getAllMatchs(_req: Request, res: Response) {
    const allMatchs = await MatchService.getAllMatchs();

    if (!allMatchs) return res.status(StatusCode.INVALIDREQ).json({ message: 'Matchs not found' });

    return res.status(StatusCode.OK).json(allMatchs);
  }

  static async addMatch(req: Request, res: Response) {
    const token = req.headers.authorization;

    if (!token) return res.status(StatusCode.INVALIDREQ).json({ message: 'Token not found' });

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    if (!decoded) return res.status(StatusCode.INVALIDREQ).json({ message: 'Token invalid' });

    const data = req.body;

    const newMatch = await MatchService.addMatchs(data);

    return res.status(StatusCode.CREATED).json(newMatch);
  }

  static async verifyEqualTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(StatusCode.INVALIDREQ).json({ message: errorEqualsTeams });
    }

    const homeTeamName = await Clubs.findOne({ where: { id: homeTeam } });
    const awayTeamName = await Clubs.findOne({ where: { id: awayTeam } });

    if (!homeTeamName || !awayTeamName) {
      return res.status(StatusCode.INVALIDREQ).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}
