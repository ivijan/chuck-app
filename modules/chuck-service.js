'use strict';

function createService(client) {

    function getRandomJoke() {
        return client.fetchJoke("random?category=dev")
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    function searchJokes(query) {
        return client.fetchJoke("search?query=" + query)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    return {
        getRandomJoke,
        searchJokes
    };
}

module.exports.create = createService;