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
