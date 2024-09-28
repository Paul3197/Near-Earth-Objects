const express = require('express');
const app = express();
const apiRoutes = require('./api');

// Middleware
app.use('/api', apiRoutes);

// Configuración del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
