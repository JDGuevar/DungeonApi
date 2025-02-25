const express = require('express');
const router = express.Router();
const dungeonController = require('../controllers/dungeonController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, dungeonController.getAllDungeons);
router.get('/:id', authenticateToken, dungeonController.getDungeonById);
router.post('/', authenticateToken, dungeonController.createDungeon);
router.get('/random', authenticateToken, dungeonController.getRandomDungeon);

module.exports = router;