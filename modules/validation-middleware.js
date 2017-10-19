'use strict';

function validateSearchQuery(req, res, next) {
    if(req.params && req.params.query) {
        return next();
    }

    const err = new Error('Please define your search query param, eq. "search/:query"!');
    err.status = 400;
    return next(err);
}

module.exports = {
    validateSearchQuery
};