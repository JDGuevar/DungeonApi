const dungeonService = require('../services/dungeonService');
const { Dungeon, Room, Enemy } = require('../models');

let dungeons = []; // Simulación de almacenamiento temporal

exports.getAllDungeons = async (req, res) => {
    try {
        const dungeons = await Dungeon.findAll({
            include: [
                {
                    model: Room,
                    include: [Enemy],
                },
            ],
        });
        res.json(dungeons);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las mazmorras' });
    }
};

exports.getDungeonById = async (req, res) => {
    try {
        const dungeon = await Dungeon.findByPk(req.params.id, {
            include: [
                {
                    model: Room,
                    include: [Enemy],
                },
            ],
        });
        if (!dungeon) return res.status(404).json({ error: 'Mazmorra no encontrada' });
        res.json(dungeon);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la mazmorra' });
    }
};

exports.createDungeon = async (req, res) => {
    try {
        const dungeon = await dungeonService.generateDungeon(req.body.type);
        res.status(201).json(dungeon);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la mazmorra' });
    }
};

exports.getRandomDungeon = async (req, res) => {
    try {
        const types = ['catacumbas', 'templo', 'cueva'];
        const type = types[Math.floor(Math.random() * types.length)];
        const dungeon = await dungeonService.generateDungeon(type);
        res.status(201).json(dungeon);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la mazmorra' });
    }
}