'use strict';

const express = require('express');
const router = express.Router();

function createChuckJokesEndpoint(chuckService, middleware) {
    router.get('/random', getRandomJokeHandler(chuckService));
    router.get('/search', middleware.validateSearchQuery);
    router.get('/search/:query', middleware.validateSearchQuery, searchJokesHandler(chuckService));

    function getRandomJokeHandler(service){
        return function(req, res) {

            service.getRandomJoke()
                .then(result => res.json(result))
                .catch(error => res.json(error));
        };
    }

    function searchJokesHandler(service){
        return function(req, res) {

            service.searchJokes(req.params.query)
                .then(result => res.json(result))
                .catch(error => res.json(error));
        };
    }

    return router;
}

module.exports.create = createChuckJokesEndpoint;