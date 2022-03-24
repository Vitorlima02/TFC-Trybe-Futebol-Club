import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import StatusCode from './statusCode';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const incorrectEmailOrPass = { message: 'Incorrect email or password' };
const allFieldsMustBeFilled = { message: 'All fields must be filled' };

const validateSchema = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  if (!user.email) return res.status(StatusCode.INVALIDREQ).json(allFieldsMustBeFilled);
  if (!user.password) return res.status(StatusCode.INVALIDREQ).json(allFieldsMustBeFilled);

  const { error } = userSchema.validate(user);
  if (error) {
    return res.status(StatusCode.INVALIDREQ).json(incorrectEmailOrPass);
  }

  next();
};

export default validateSchema;

/* function isEmailValid(email: string): boolean {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email);
}

const messageError = 'All fields must be filled';

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return res.status(StatusCode.INVALIDREQUEST).json({ message: messageError });
  }

  if (!isEmailValid(email)) {
    return res.status(StatusCode.INVALIDREQUEST).json({ message: 'Incorrect email or password' });
  }

  next();
};

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
    return res.status(StatusCode.INVALIDREQUEST).json({ message: messageError });
  }

  if (password === '' || password.length <= 6) {
    return res.status(StatusCode.INVALIDREQUEST).json({ message: messageError });
  }

  next();
}; */

/* export default validateEmail; */
