module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clubName: {
        field:'club_name',
        allowNull: false,
        type: Sequelize.STRING,
      },
    }, {
      underscored: true,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('clubs');
  },
};