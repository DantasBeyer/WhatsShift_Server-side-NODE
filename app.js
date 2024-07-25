const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userProfile');

const app = express();

// Conectar ao Banco de Dados


// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api/users', userRoutes);

module.exports = app;
