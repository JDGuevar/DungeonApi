const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos
    process.env.DB_USER, // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña
    {
        host: process.env.DB_HOST, // Host de Azure SQL Database
        dialect: 'mssql', // Usamos SQL Server
        dialectOptions: {
            options: {
                encrypt: true, // Azure requiere encriptación
            },
        },
        logging: false, // Desactiva los logs de Sequelize
    }
);

module.exports = sequelize;