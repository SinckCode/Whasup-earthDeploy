// src/app.js
require('dotenv').config();
const express = require('express');
const { deploy } = require('./controllers/mainController'); // 👈 importar controller directo

const app = express();
app.use(express.json());

// Ruta única: POST /deploy
app.post('/deploy', (req, res) => {
  console.log('🔥 Entró a POST /deploy');
  deploy(req, res);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Deploy API running on port ${PORT}`);
});
