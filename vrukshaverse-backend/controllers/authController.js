const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'User registration failed' });
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log('Login request:', { username, password });

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        console.log('User from DB:', user);

        if (!user) return res.status(404).json({ error: 'User not found' });

        const valid = await bcrypt.compare(password, user.password);
        console.log('Password match:', valid);

        if (!valid) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login error:', err); // 👈 log the actual error
        res.status(500).json({ error: 'Login failed' });
    }
};
module.exports = { registerUser, loginUser };
