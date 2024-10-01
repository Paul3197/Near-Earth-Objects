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
    nasa_jpl_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimated_diameter_min: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estimated_diameter_max: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    is_potentially_hazardous_asteroid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    kilometers_per_second: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    kilometers_per_hour: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orbiting_body: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Asteroid",
  }
);

module.exports = Asteroid; // Asegúrate de que esto está presente
