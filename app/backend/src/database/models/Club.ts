import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matchs from './Matchs';

class Clubs extends Model {
  public id: number;

  public clubName: string;
}

Clubs.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Clubs',
  timestamps: false,
});

Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeClub' });
Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayClub' });

Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'homeMatch' });
Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'awayMatch' });

export default Clubs;
