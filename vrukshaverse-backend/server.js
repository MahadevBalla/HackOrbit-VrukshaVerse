// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const plantRoutes = require('./routes/plantRoutes');
const logger = require('./middleware/logger.js');
const errorHandler = require('./middleware/errorHandler.js');
const app = express();


const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/plants', plantRoutes);
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(errorHandler);
