// controllers/plantController.js
const pool = require('../db');

const getAllPlants = async (req, res) => {
    const { name, region, limit = 10, offset = 0 } = req.query;
    let query = 'SELECT * FROM plants WHERE 1=1';

    const values = []

    if (name) {
        values.push(`%${name}%`);
        query += ` AND name ILIKE $${values.length}`;
    }
    if (region) {
        values.push(`%${region}%`);
        query += ` AND region ILIKE $${values.length}`;
    }

    values.push(limit);
    query += ` LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    try {
        const result = await pool.query(query, values);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
const addPlant = async (req, res) => {
    const { name, scientificName, region, description, image, audioUrl, model_3d_url } = req.body;
    if (!name || !region || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO plants (name, scientificName, region, description, image, audioUrl, model_3d_url) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
            [name, scientificName, region, description, image, audioUrl, model_3d_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add plant' });
    }
}

const capturePlant = async (req, res) => {
    const userId = req.user.userId;
    const plantId = req.params.id;
    try {
        await pool.query(
            'INSERT INTO captures (user_id, plant_id) VALUES ($1, $2)',
            [userId, plantId]
        );

        await pool.query(
            'UPDATE users SET xp = xp + 50 WHERE id = $1',
            [userId]
        );
        res.json({ message: 'Plant capture. +50 XP' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Capture failed' });
    }
}

const uploadPlantFile = async (req, res) => {
    const plantId = req.params.id;
    const fileType = req.params.type;

    const validFields = {
        image: 'image',
        audio: 'audioUrl',
        model: 'model_3d_url'
    };
    const fieldToUpdate = validFields[fileType];

    if (!fieldToUpdate) {
        return res.status(400).json({ error: 'Invalid upload type' });
    }
    const fileUrl = req.file.location;

    try {
        const result = await pool.query(
            `UPDATE plants SET ${fieldToUpdate} = $1 WHERE id = $2 RETURNING *`,
            [fileUrl, plantId]
        );
        res.json({
            message: `${fileType} upload successfully`,
            plant: result.rows[0]
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Upload failed' });
    }
};
module.exports = { getAllPlants, addPlant, capturePlant, uploadPlantFile };
