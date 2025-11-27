// src/routes/index.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// POST /deploy/:project  (astrocloud, whatsup, etc.)
router.post('/deploy/:project', mainController.deploy);

module.exports = router;
