import * as bcrypt from 'bcryptjs';
import User from '../models/User';
import tokenGenerate from '../middlewares/auth';

const messageError = 'Incorrect email or password';

export default class LoginService {
  static async loginUser(email: string, password: string) {
    const token = tokenGenerate(email);

    const loggedUser = await User.findOne({ where: { email } });

    if (!loggedUser) return { message: 'User not found' };

    const checkPassword = bcrypt.compareSync(password, loggedUser.password);

    if (checkPassword === false) return { message: messageError };

    return {
      user: {
        id: loggedUser.id,
        username: loggedUser.username,
        role: loggedUser.role,
        email,
      },
      token,
    };
  }
}
