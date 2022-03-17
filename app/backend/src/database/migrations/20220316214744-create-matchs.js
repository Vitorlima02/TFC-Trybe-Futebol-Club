'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.NUMBER
      },
      homeTeam: {
        field: 'home_team',
        allowNull: false,
        type: Sequelize.NUMBER
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        allowNull: false,
        type: Sequelize.NUMBER
      },
      awayTeam: {
        field: 'away_team',
        allowNull: false,
        type: Sequelize.NUMBER
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        allowNull: false,
        type: Sequelize.NUMBER
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
