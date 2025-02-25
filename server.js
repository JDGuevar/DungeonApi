// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dungeonRoutes = require('./src/routes/dungeonRoutes');
const authRoutes = require('./src/routes/authRoutes');
require('dotenv').config();
const sequelize = require('./src/config/sequelize');
const { Dungeon, Room, Enemy } = require('./src/models');

// Configuración del servidor
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Logging de solicitudes

// Documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Redirigir la raíz a la documentación
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// Rutas de la API
app.use('/dungeons', dungeonRoutes);

// Rutas de autenticación
app.use('/auth', authRoutes);

sequelize.sync({ force: true }) // Usa { force: true } solo en desarrollo para recrear las tablas
    .then(() => console.log('✅ Base de datos sincronizada'))
    .catch((error) => console.error('❌ Error sincronizando la base de datos:', error));

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));