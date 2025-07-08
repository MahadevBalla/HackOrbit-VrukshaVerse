// routes/plantRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { getAllPlants, addPlant, capturePlant, uploadPlantFile } = require('../controllers/plantController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllPlants);
router.post('/', addPlant);
router.post('/:id/upload/:type', authMiddleware, upload.single('file'), uploadPlantFile);
router.post('/:id/capture', authMiddleware, capturePlant);
module.exports = router;
