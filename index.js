"use strict";

global.PACKAGE_NAME = "Meetup";

const express       = require('express'),
    bodyParser      = require('body-parser'),
    fs              = require('fs'),
    lib             = require('./lib'),
    API             = require('rapi-js-package'),
    _               = lib.callback;

const PORT          = process.env.PORT || 8080;
const app           = express();

let mfile = fs.readFileSync('./metadata.json', 'utf-8'),
    afile = fs.readFileSync('./api.json', 'utf-8');

let metadata = JSON.parse(mfile),
    apiHash  = JSON.parse(afile);

app.use(bodyParser.json(({limit: '50mb'})));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.all(`/api/${PACKAGE_NAME}`, (req, res) => { res.send(metadata); });

for(let func in apiHash) {
    let options = {
        parseUri: true
    };
    let {
        method, 
        args,
        cargs,
        multiprop,
        multipartPhoto,
        res: uri
    } = apiHash[func];

    app.post(`/api/${PACKAGE_NAME}/${func}`, _(function* (req, res) {
        let api      = new API(uri, { storage: '.' });
        let opts     = {};
        let r = {
            callback     : "",
            contextWrites: {}
        };

        req.body.args = lib.clearArgs(req.body.args);

        for (var i = args.length - 1; i >= 0; i--) {
            opts[args[i]] = req.body.args[cargs[i]];
        }

        opts['$accessToken'] = req.body.args['accessToken'];

        method == 'GET' || method == 'DELETE' ? options.query = opts : options.body = opts;
        options.isRawBody = !(method == 'GET' || method == 'DELETE');
        options.parseMultiple = !!(multiprop)
        options.parseUri  = true;
        options.method = method;

        let upload = opts['photo'] || opts['new_photo'];
        if(multipartPhoto && upload) {
            options.files = {};
            options.files[opts['new_photo'] ? 'new_photo' : 'photo'] = upload;
        }

        let to = req.body.args.to || 'to';
        let response;

        try {
            response            = yield api.auth({type: 'bearer', token: req.body.args['accessToken']}).request(options);
            r.callback          = 'success';
            r.contextWrites[to] = response;
        } catch(e) {
            console.log(e);
            r.callback          = 'error';
            r.contextWrites[to] = e.message ? e.message : e;
        }

        res.status(200).send(r);
    }))
}

app.listen(PORT);
module.exports = app;