const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuração do servidor
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/whatsshift');

// Verificar conexão ao MongoDB
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Rotas
const userProfileRouter = require('./routes/userProfile');
app.use('/userProfile', userProfileRouter);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
