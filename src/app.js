const express = require('express');
const app = express();

console.log("🔥 Iniciando servidor...");

app.use(express.json());

app.post('/deploy', (req, res) => {
  console.log('🔥 LLEGÓ A POST /deploy');
  res.send('OK desde /deploy');
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`✅ API mínima escuchando en ${PORT}`);
});

// ----------- CAPTURAR ERRORES REALES ------------
process.on('uncaughtException', (err) => {
  console.error('💥 uncaughtException:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('💥 unhandledRejection:', reason);
});
process.on('exit', (code) => {
  console.log("⚡ process.exit ejecutado con código:", code);
});
