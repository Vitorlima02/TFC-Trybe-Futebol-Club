import { Request, Response, NextFunction } from 'express';
import StatusCode from './statusCode';

function isEmailValid(email: string): boolean {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email);
}

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return res.status(StatusCode.INVALIDREQUEST).json({ message: 'All fields must be filled' });
  }

  if (!isEmailValid(email)) {
    return res.status(StatusCode.INVALIDREQUEST).json({ message: 'All fields must be filled' });
  }

  next();
};

export default validateEmail;
