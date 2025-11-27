// src/app.js
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Deploy API running on port ${PORT}`);
});
