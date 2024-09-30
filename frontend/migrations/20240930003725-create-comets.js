'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comets', { // Cambié 'Comet' a 'Comets'
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      object_name: { // Asegúrate de que este campo sea correcto
        type: Sequelize.STRING,
        allowNull: false,
      },
      epoch_tdb: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tp_tdb: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      e: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      i_deg: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      w_deg: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      node_deg: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      q_au_1: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      q_au_2: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      p_yr: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      moid_au: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      ref: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comets'); // Cambié 'Kites' a 'Comets'
  },
};


/* // migrations/xxxxxx-create-kites.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comet', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      object: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      epoch_tdb: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tp_tdb: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      e: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      i_deg: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      w_deg: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      node_deg: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      q_au_1: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      q_au_2: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      p_yr: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      moid_au: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      ref: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      object_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Kites');
  },
};
 */