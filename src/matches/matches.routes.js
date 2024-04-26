const express = require('express');
const router = express.Router();

const { matchRules, matchRulesPutTime, matchRulesGet } = require('./validator');
const handleValidationErrors = require('../../middleware/validationErrorHandler');
const { createMatch, finishTime, getById, getMatchInProgress } = require('./matches.controller');

// Ruta para crear un nuevo partido
router.post('/create', matchRules, handleValidationErrors, createMatch);
router.put('/:id/time', matchRulesPutTime, handleValidationErrors, finishTime);
router.get('/status/inprogress', getMatchInProgress);
router.get('/:id', matchRulesGet, handleValidationErrors, getById);

module.exports = router;