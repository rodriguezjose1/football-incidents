
const express = require('express');
const router = express.Router();

const { teamRules } = require('./validator');
const handleValidationErrors = require('../../middleware/validationErrorHandler');
const { getTeams } = require('./teams.controller');

// Ruta para crear un nuevo partido
router.get('/', teamRules, handleValidationErrors, getTeams);

module.exports = router;