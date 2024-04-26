const { createHttpError } = require('../../common/errors');
const { StatusCodes } = require('http-status-codes');

const Team = require('../../models/team.model');

const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find({}).sort({ name: 1 }).lean();
    return res.status(200).json({ teams });
  } catch (error) {
    next(error);
  }
}


module.exports = { getTeams };