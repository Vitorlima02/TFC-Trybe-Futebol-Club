import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const jwtConfig: jwt.SignOptions = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const tokenGenerate = (email: string): string => {
  const payLoad = {
    email,
  };
  let token = '';

  if (token) {
    token = jwt.sign({ info: payLoad }, secret, jwtConfig);
  }

  return token;
};

export default tokenGenerate;
