import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;

  public userName: string;

  public role: string;

  public email: string;

  public password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  timestamps: false,
});

export default User;
