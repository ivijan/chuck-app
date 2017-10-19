'use strict';

const Promise = require('bluebird');
const request = require('request');

const options  = {
    contentType: 'Content-type: application/json',
    json: true
};

function createClient(URL) {

    function fetchJoke(apiEnpoint) {
        return new Promise((resolve, reject) => {
            request.get(URL + apiEnpoint, options, (error, result) => {
                if (error) {
                    return reject(error);
                }

                if (result.statusCode === 200) {
                    return resolve(result.body);
                } else {
                    return reject(new Error("Error occurred while fetching joke: " + result));
                }
            });
        });
    }

    return {
        fetchJoke
    };
}

module.exports.create = createClient;