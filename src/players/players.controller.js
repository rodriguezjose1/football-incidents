const { createHttpError } = require('../../common/errors');
const { StatusCodes } = require('http-status-codes');

const Player = require('../../models/player.model');

const getPlayers = async (req, res, next) => {
  try {
    const players = await Player.find({}).sort({ lastName: 1 }).lean();
    return res.status(200).json({ players });
  } catch (error) {
    next(error);
  }
}


module.exports = { getPlayers };