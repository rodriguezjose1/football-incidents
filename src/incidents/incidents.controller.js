const { createHttpError } = require('../../common/errors');
const { StatusCodes } = require('http-status-codes');

const Incident = require('../../models/incident.model');
const Team = require('../../models/team.model');
const Player = require('../../models/player.model');

const findLast = async () => {
  const lastIncident = await Incident.findOne().sort({ createdAt: -1 }).lean();
  if (!lastIncident) return null;

  return lastIncident;
}

const createIncident = async (req, res, next) => {
  try {
    const newIncident = req.body;
    console.log(newIncident);

    const lastIncident = await findLast();
    if (lastIncident) {
      if (lastIncident.minute === newIncident.minute && lastIncident.type === newIncident.type) {
        throw createHttpError(StatusCodes.BAD_REQUEST, 'INCIDENT_ALREADY_REGISTERED', 'Incident already registered');
      }
    }

    if (newIncident.player) {
      const player = await Player.findById(newIncident.player);
      if (!player) throw createHttpError(StatusCodes.BAD_REQUEST, 'PLAYER_NOT_FOUND', 'Player not found');

      newIncident.player = {
        id: player._id,
        firstName: player.firstName,
        lastName: player.lastName
      }
    }

    if (newIncident.assistance) {
      const assistant = await Player.findById(newIncident.assistance);
      if (!assistant) throw createHttpError(StatusCodes.BAD_REQUEST, 'ASSISTANT_NOT_FOUND', 'Assistant not found');

      newIncident.assistance = {
        id: assistant._id,
        firstName: assistant.firstName,
        lastName: assistant.lastName
      }
    }

    if (newIncident.type === 'substitution') {
      const playerIn = await Player.findById(newIncident.replacementIn);
      if (!playerIn) throw createHttpError(StatusCodes.BAD_REQUEST, 'PLAYER_NOT_FOUND', 'Replacement IN not found');

      const playerOut = await Player.findById(newIncident.replacementOut);
      if (!playerOut) throw createHttpError(StatusCodes.BAD_REQUEST, 'PLAYER_NOT_FOUND', 'Replacement OUT not found');

      newIncident.replacementIn = {
        id: playerIn._id,
        firstName: playerIn.firstName,
        lastName: playerIn.lastName
      }
      newIncident.replacementOut = {
        id: playerOut._id,
        firstName: playerOut.firstName,
        lastName: playerOut.lastName
      }
    }

    const team = await Team.findById(newIncident.team);
    if (!team) throw createHttpError(StatusCodes.BAD_REQUEST, 'TEAM_NOT_FOUND', 'Team not found');

    newIncident.team = {
      id: team._id,
      name: team.name,
      code: team.code
    };

    await Incident.create(newIncident);

    res.status(200).json({ mensaje: 'Incidencia registrada correctamente' });

  } catch (error) {
    next(error);
  }
};

const getIncidents = async (req, res, next) => {
  try {
    const { match } = req.params;

    const incidents = await Incident.find({ match }).lean();
    res.status(200).json({ incidents});
  } catch (error) {
    next(error);
  }
}


module.exports = { createIncident, getIncidents };