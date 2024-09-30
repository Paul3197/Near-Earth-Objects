const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ajusta la ruta según tu estructura

const Asteroid = sequelize.define(
  "Asteroid",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Asegúrate de que esto esté definido
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inclination: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    eccentricity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: "Asteroid",
  }
);

module.exports = Asteroid; // Asegúrate de que esto está presente
