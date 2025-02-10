const express = require('express');
const router = express.Router();
const dungeonController = require('../controllers/dungeonController');

router.get('/', dungeonController.getAllDungeons);
router.post('/', dungeonController.createDungeon);
router.get('/id=:id', dungeonController.getDungeonById);
router.get('/random-dungeon', dungeonController.getRandomDungeon);

module.exports = router;