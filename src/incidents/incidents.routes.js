const express = require('express');
const router = express.Router();

const { incidentRules } = require('./validator');
const handleValidationErrors = require('../../middleware/validationErrorHandler');
const { createIncident, getIncidents } = require('./incidents.controller');

// Ruta para crear un nuevo partido
router.post('/', incidentRules, handleValidationErrors, createIncident);
router.get('/match/:match', getIncidents);

module.exports = router;