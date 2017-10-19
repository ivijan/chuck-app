'use strict';

const Promise = require('bluebird');
const request = require('supertest');
const should = require('should');
require('should-http');

const chuckMiddleware = require('../modules/validation-middleware');
const chuckJokesEndpointModule = require('../routes/chuck-endpoint');

const chuckRandomEndpointPath = '/random';
const chuckSearchEndpointPath = '/search/';
const queryMock = 'australia';

describe("Chuck jokes endpoint", () => {

    const chuckEndpointMock = chuckJokesEndpointModule.create({
        getRandomJoke: () => {
            return Promise.resolve(mockedJokeList());
        },
        searchJokes: (query) => {
            should.exist(query);
            query.should.equal(queryMock);
            return Promise.resolve(mockedJokeList());
        }
    }, chuckMiddleware);

    const app = require('../app')({
        chuckEndpoint: chuckEndpointMock
    });

    describe("should return 200 for random joke", () => {

        it("application/json content-type", done => {
            request(app)
                .get(chuckRandomEndpointPath)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    res.should.json();
                    should.exist(res.body.total);
                    res.body.total.should.equal(mockedJokeList().total);
                    should.exist(res.body.result);
                    res.body.result.should.be.Array();
                    res.body.result.should.have.length(mockedJokeList().result.length);
                    return done();
                });
        });
    });

    describe("should return 200 for joke search with query", () => {

        it("application/json content-type", done => {
            request(app)
                .get(chuckSearchEndpointPath + queryMock)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    res.should.json();
                    should.exist(res.body.total);
                    res.body.total.should.equal(mockedJokeList().total);
                    should.exist(res.body.result);
                    res.body.result.should.be.Array();
                    res.body.result.should.have.length(mockedJokeList().result.length);
                    return done();
                });
        });
    });

    describe("should return error for joke search without query", () => {

        it("application/json content-type", done => {
            request(app)
                .get(chuckSearchEndpointPath)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    res.should.html();
                    res.body.should.empty();
                    return done();
                });
        });
    });

    function mockedJokeList() {
        return {
            "total": 3,
            "result": [
                {
                    "category": [
                        "science"
                    ],
                    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
                    "id": "zfgekm2usfyfra7m5x0wta",
                    "url": "http://api.chucknorris.io/jokes/zfgekm2usfyfra7m5x0wta",
                    "value": "If tapped, a Chuck Norris roundhouse kick could power the country of Australia for 44 minutes."
                },
                {
                    "category": null,
                    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
                    "id": "VvkoySSWRu6LLPAlj4WVdA",
                    "url": "http://api.chucknorris.io/jokes/VvkoySSWRu6LLPAlj4WVdA",
                    "value": "Chuck Norris won master chef Australia by cooking 2 minute noodles."
                },
                {
                    "category": null,
                    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
                    "id": "oDEgbxIwR0i90RLXk_QNEA",
                    "url": "http://api.chucknorris.io/jokes/oDEgbxIwR0i90RLXk_QNEA",
                    "value": "Contrary to popular belief, Chuck Norris, not the box jellyfish of northern Australia, is the most venomous creature on earth. Within 3 minutes of being bitten, a human being experiences the following symptoms: fever, blurred vision, beard rash, tightness of the jeans, and the feeling of being repeatedly kicked through a car windshield."
                }
            ]
        };
    }
});