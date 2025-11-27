// src/app.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/deploy', (req, res) => {
  console.log('🔥 LLEGÓ A POST /deploy');
  res.send('OK desde /deploy');
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`✅ API mínima escuchando en ${PORT}`);
});

// Para ver errores que maten el proceso:
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('💥 Unhandled Rejection:', reason);
});
