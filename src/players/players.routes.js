const express = require('express');
const router = express.Router();

const { playerRules } = require('./validator');
const handleValidationErrors = require('../../middleware/validationErrorHandler');
const { getPlayers } = require('./players.controller');

// Ruta para crear un nuevo partido
router.get('/', playerRules, handleValidationErrors, getPlayers);

module.exports = router;