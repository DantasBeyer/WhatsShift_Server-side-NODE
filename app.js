const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userProfile');

const app = express();

// Conectar ao Banco de Dados
connectDB();

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api/users', userRoutes);

module.exports = app;
