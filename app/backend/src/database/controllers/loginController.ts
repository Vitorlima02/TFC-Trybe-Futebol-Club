import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import StatusCode from '../middlewares/statusCode';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const response = await LoginService.loginUser(email, password);

    if (!response.user) {
      return res.status(StatusCode.UNAUTHORIZED).json(response);
    }

    return res.status(StatusCode.OK).json(response);
  }
}
