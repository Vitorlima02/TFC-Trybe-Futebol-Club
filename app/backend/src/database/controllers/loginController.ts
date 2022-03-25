import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import LoginService from '../services/loginService';
import StatusCode from '../middlewares/statusCode';
import User from '../models/User';

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const response = await LoginService.loginUser(email, password);

    if (!response.user) {
      return res.status(StatusCode.UNAUTHORIZED).json(response);
    }

    return res.status(StatusCode.OK).json(response);
  }

  static async validateLogin(req: Request, res: Response) {
    const token = req.headers.authorization;

    if (!token) return res.status(StatusCode.INVALIDREQ).json({ message: 'Token not found' });

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    req.body = decoded.info;

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) return res.status(StatusCode.OK).json(user.role);
  }
}
