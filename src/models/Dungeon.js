// src/models/Dungeon.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Dungeon = sequelize.define('Dungeon', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Dungeon;