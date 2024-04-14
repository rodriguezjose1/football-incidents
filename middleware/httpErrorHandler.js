const handleHttpError = (err, req, res, next) => {
    // Log the error
    if (!err.handled) {
        console.log('HTTP ERROR: ', err);
    }
    
    if (!err.errorCode) err.errorCode = 500;

    // Set a default status code and error message
    res.status(err.status || 500).json({
        error: {
            message: err.errorCode === 500 ? 'Internal Server Error' : (err.message || 'Internal Server Error'),
            code: err.errorCode,
            status: err.status || 500,
            errors: err.errorCode === 400 ? err.errors : []
        }
    });
}

module.exports = handleHttpError;