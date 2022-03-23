import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import StatusCode from '../middlewares/statusCode';

export class LoginController {
  constructor(
    readonly loginService: LoginService,
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const response = await this.loginService.loginUser(email, password);

    if (!response.user) {
      return res.status(StatusCode.UNAUTHORIZED).json(response);
    }

    return res.status(StatusCode.OK).json(response);
  }
}

export default LoginController;
