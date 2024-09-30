const { Sequelize } = require('sequelize');

// Reemplaza estos valores con tus propios datos de conexión
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

// Ejecuta la prueba de conexión
testConnection();

module.exports = sequelize;