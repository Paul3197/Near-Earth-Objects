const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../config/database');

const Comet = sequelize.define(
  "Comet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Asegúrate de que esto esté definido
    },
    object_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    epoch_tdb: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tp_tdb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    e: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    i_deg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    w_deg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    node_deg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    q_au_1: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    q_au_2: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    p_yr: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    moid_au: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comet",
  }
);

module.exports = Comet;


