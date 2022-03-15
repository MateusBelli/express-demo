function log(req, res, next) { // Next is a reference for the next request
    console.log('Logging...');
    next(); // Go to the next middleware
}

module.exports = log;