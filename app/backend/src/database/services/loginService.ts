import * as bcrypt from 'bcryptjs';
import User from '../models/User';
import tokenGenerate from '../middlewares/auth';

const messageError = 'Incorrect email or password';

export default class LoginService {
  constructor(
    readonly TokenGenerate: typeof tokenGenerate,
  ) {}

  async loginUser(email: string, password: string) {
    const token = await this.TokenGenerate(email);
    const loggedUser = await User.findOne({ where: { email } });

    if (password === '' || password.length <= 6) {
      return { message: 'All fields must be filled' };
    }

    if (!loggedUser) return { message: 'User not found' };

    const checkPassword = bcrypt.compareSync(password, loggedUser.password);

    if (!checkPassword) return { message: messageError };

    return {
      user: {
        id: loggedUser.id,
        username: loggedUser.userName,
        role: loggedUser.role,
        email: loggedUser.email,
      },
      token,
    };
  }
}
