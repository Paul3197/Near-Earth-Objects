'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Asteroids', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nasa_jpl_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estimated_diameter_min: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      estimated_diameter_max: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      is_potentially_hazardous_asteroid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      kilometers_per_second: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      kilometers_per_hour: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      orbiting_body: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Asteroids');
  }
};

/* 'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Asteroids', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inclination: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      eccentricity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Asteroids');
  }
};
 */