const Dungeon = require('./Dungeon');
const Room = require('./Room');
const Enemy = require('./Enemy');

// Relación Dungeon -> Rooms (Una mazmorra tiene muchas habitaciones)
Dungeon.hasMany(Room, { foreignKey: 'dungeon_id' });
Room.belongsTo(Dungeon, { foreignKey: 'dungeon_id' });

// Relación Room -> Enemies (Una habitación tiene muchos enemigos)
Room.hasMany(Enemy, { foreignKey: 'room_id' });
Enemy.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = {
    Dungeon,
    Room,
    Enemy,
};