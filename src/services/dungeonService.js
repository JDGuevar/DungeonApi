// src/services/dungeonService.js
const { v4: uuidv4 } = require('uuid');
const { Dungeon, Room, Enemy } = require('../models');

exports.generateDungeon = async (type) => {
    // Crear la mazmorra
    const dungeon = await Dungeon.create({ id: uuidv4(), type });

    // Generar habitaciones
    const rooms = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, (_, i) => ({
        id: uuidv4(),
        dungeon_id: dungeon.id,
        room_number: i + 1,
    }));

    // Guardar habitaciones en la base de datos
    const createdRooms = await Room.bulkCreate(rooms);

    // Generar enemigos para cada habitación
    for (const room of createdRooms) {
        const enemies = generateEnemies(type).map((name) => ({
            id: uuidv4(),
            room_id: room.id,
            name,
        }));
        await Enemy.bulkCreate(enemies);
    }

    return dungeon;
};

const generateEnemies = (type) => {
    const enemiesByType = {
        "catacumbas": ["Esqueleto", "Zombi", "Espectro"],
        "templo": ["Gólem", "Naga", "Guardián Elemental"],
        "cueva": ["Araña Gigante", "Basilisco", "Troll"],
    };
    return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => {
        const enemies = enemiesByType[type] || [];
        return enemies[Math.floor(Math.random() * enemies.length)];
    });
};