function authenticate(req, res, next) { // Next is a reference for the next request
    console.log('Authenticating...');
    next(); // Go to the next middleware
}

module.exports = authenticate;