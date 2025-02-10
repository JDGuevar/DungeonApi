const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Enemy = sequelize.define('Enemy', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Enemy;