'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        field: 'home_team',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs',
          key: 'id'
        },
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        allowNull: false,
        type: Sequelize.INTEGER
      },
      awayTeam: {
        field: 'away_team',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs',
          key: 'id'
        },
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        allowNull: false,
        type: Sequelize.INTEGER
      },
      inProgress: {
        field: 'in_progress',
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
