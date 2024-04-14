const express = require('express');
const router = express.Router();

const { matchRules } = require('./validator');
const handleValidationErrors = require('../../middleware/validationErrorHandler');
const { createMatch, finishMatch } = require('./matches.controller');

// Ruta para crear un nuevo partido
router.post('/create', matchRules, handleValidationErrors, createMatch);

// Ruta para obtener todos los partidos
router.put('/:id/finish', finishMatch);

module.exports = router;