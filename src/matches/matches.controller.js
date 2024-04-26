const createHttpError = require('http-errors');
const Match = require('../../models/match.model');
const Incident = require('../../models/incident.model');
const { StatusCodes } = require('http-status-codes');

const createMatch = async (req, res, next) => {
    try {
        const matchInProgress = await Match.findOne({ finished: false }).lean();
        if (matchInProgress) throw createHttpError(StatusCodes.BAD_REQUEST, 'MATCH_IN_PROGRESS', 'There is already a match in progress');

        const match = req.body;
        const newMatch = await Match.create(match);
        return res.status(200).json({ message: 'Match created', match: newMatch });
    } catch (error) {
        next(error);
    }
};

const finishTime = async (req, res, next) => {
    try {
        const { id: matchId } = req.params
        const body = req.body;

        const matchInProgress = await Match.findOne({ _id: req.params.id, finished: false }).lean();
        if (!matchInProgress) throw createHttpError(StatusCodes.BAD_REQUEST, 'MATCH_NOT_FOUND', 'Match not found');

        if (matchInProgress.secondsFirstTime === 0) {
            await Match.findByIdAndUpdate(matchId, { $set: { secondsFirstTime: body.secondsFirstTime } });
            await Incident.create({ minute: body.secondsFirstTime, type: 'end_first_time', match: matchId });
        } else {
            await Match.findByIdAndUpdate(matchId, { $set: { secondsSecondTime: body.secondsSecondTime, finished: true } });
        }

        return res.status(200).json({ message: 'Match finished' });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id: matchId } = req.params

        const match = await Match.findOne({ _id: matchId }).populate('homeTeam').populate('awayTeam').lean();
        if (!match) throw createHttpError(StatusCodes.BAD_REQUEST, 'MATCH_NOT_FOUND', 'Match not found');

        return res.status(200).json({ match });
    } catch (error) {
        next(error);
    }
};

const getMatchInProgress = async (req, res, next) => {
    try {
        const match = await Match.findOne({ finished: false }).populate('homeTeam').populate('awayTeam').lean();

        return res.status(200).json({ match });
    } catch (error) {
        next(error);
    }
};

module.exports = { createMatch, finishTime, getById, getMatchInProgress };