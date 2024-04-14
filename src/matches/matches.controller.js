const Match = require('../../models/match.model');

const createMatch = async (req, res, next) => {
    try {
        const matchInProgress = await Match.findOne({ finished: false }).lean();
        if (matchInProgress) throw createHttpError(StatusCodes.BAD_REQUEST, 'MATCH_IN_PROGRESS', 'There is already a match in progress');

        const match = req.body;
        await Match.create(match);
        res.status(200).json({ message: 'Match created' });
    } catch (error) {
        next(error);
    }
};
 

const finishMatch = async (req, res, next) => {
    try {
        const { id: matchId } = req.params
        const matchInProgress = await Match.findOne({ _id: req.params.id, finished: false }).lean();
        if (!matchInProgress) throw createHttpError(StatusCodes.BAD_REQUEST, 'MATCH_NOT_FOUND', 'Match not found');

        await Match.findByIdAndUpdate(matchId, { $set: { finished: true } });
        res.status(200).json({ message: 'Match finished' });
    } catch (error) {
        next(error);
    }
};

module.exports = { createMatch, finishMatch };