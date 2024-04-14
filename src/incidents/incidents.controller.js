const { createHttpError } = require('../../common/errors');
const { StatusCodes } = require('http-status-codes');

const Incident = require('../../models/incident.model');
const Team = require('../../models/team.model');
const Player = require('../../models/player.model');

const createIncident = async (req, res, next) => {
  try {
    const newIncident = req.body;

    const player = await Player.findById(newIncident.player);
    if (!player) throw createHttpError(StatusCodes.BAD_REQUEST, 'PLAYER_NOT_FOUND', 'Player not found');

    const team = await Team.findById(newIncident.team);
    if (!team) throw createHttpError(StatusCodes.BAD_REQUEST, 'TEAM_NOT_FOUND', 'Team not found');

    newIncident.team = {
      id: team._id,
      name: team.name,
      code: team.code
    };

    newIncident.player = {
      id: player._id,
      firstName: player.firstName,
      lastName: player.lastName
    }

    await Incident.create(newIncident);

    res.status(200).json({ mensaje: 'Incidencia registrada correctamente' });

  } catch (error) {
    next(error);
  }
};


module.exports = { createIncident };