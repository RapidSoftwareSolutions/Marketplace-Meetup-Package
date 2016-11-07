let assert = require('chai').assert;

const 
    accessToken = 'ya29.CjCCA1YwinxOCa-lj7L607KLE4-_UNTN6NKp78cGa8UTk4vWtgpyRaILedVvykRsBhg',
    part        = 'id,snippet',
    videoId     = 'hAZdovB2JaE',
    channelId   = 'UCKfpjMinagvyf9cKHiBcmGw',
    playlistId  = 'PLchbjh4kWFjPRLTV7cYkz7XQ7Ofmi9x99';

const Rapid = require('..');
const _ = require('../lib/functions').callback;

const uri = 'https://api.github.com/repos/:owner/:repo/events'
    

describe('RapidAPI js lib', function () {
    it('should successfully call api', function (done) {
        this.timeout(5000);

        const api = new Rapid(uri, {});

        //api.auth({type: 'basic', username: 'user', password: 'pass'})

        api.request({
            query: {
                $owner: 'zhukov',
                $repo: 'webogram'
            },
            parseUri: true
        })
        .then((result) => {
            done()
        })
        .catch((err) => {
            done(err);
        });
    });

    it('should return an required err', function (done) {
        this.timeout(5000);

        const api = new Rapid(uri, {});

        //api.auth({type: 'basic', username: 'user', password: 'pass'})
        // will use in generator
        try {
            api.request({
                query: {
                    $owner: '',
                    $repo: 'webogram'
                },
                parseUri: true
            })
            .then((result) => {
                done(true)
            });
        } catch(e) {
            console.log(e.message);
            done(null, e)
        }
    });
});
