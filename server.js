const express = require("express");
const connectDB = require("./config/db");
const app = require("./app");
const PORT = process.env.PORT || 5000;

// Conectar ao Banco de Dados
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
