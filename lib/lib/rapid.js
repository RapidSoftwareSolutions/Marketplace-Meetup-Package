const Q       = require('q');
const fs      = require('fs');
const lib     = require('./functions');
const path    = require('path');
const spawn   = require('child_process').spawnSync
const request = require('request');

class Api {

    /**
     * Init API.
     *
     * @param {String} options
     * @param {String} options.method   - Request method. Also available as request option
     * @param {String} options.endpoint - Request API endpoint
     * @param {Object} options.headers  - Custom http headers {'header': 'value'}
     */

    constructor(endpoint, options) {

        if(!endpoint || typeof endpoint !== 'string')
            throw new Error('Fatal: Api endpoint url is required.');

        options = options || {};

        this.method   = options.method  || 'GET';
        this.headers  = options.headers || {};
        this.storage  = options.storage || ''; 
        this.endpoint = endpoint; 

        if (!this.headers["user-agent"])
            this.headers["user-agent"] = "RapidApi Client";
    }

    /**
     * API auth
     *
     * @param {Object} options
     * @param {String} options.type     - Auth type: basic|bearer|...todo
     * @param {String} options.username - Username for basic auth
     * @param {String} options.password - Password for basic auth
     * @param {String} options.token    - Access Token
     */

    auth(options) {
        if(!options.type) return;

        if(options.type == 'basic') {
            if(!options.username) console.log('Warn: auth username is empty');
            if(!options.password) console.log('Warn: auth password is empty');
        }

        if(options.type == 'bearer') {
            options = {
                'bearer': options.token
            }
        }

        this.auth = options;

        return this;
    }

    /**
     * API request
     *
     * @param {Object} options
     * @param {String} options.method    - request method. GET by default. POST if body is setted
     * @param {String} options.isForm    - true if API awaits for form data
     * @param {String} options.isRawBody - true if API awaits for raw post body
     * @param {String} options.isRawBody - true if you need replace uri params like /:uri with options.query keys
     * @param {Object} options.files     - key:file_link hash
     * @param {Object} options.body      - request body
     *
     * @return {Promise} Promise of request
     */

    request(options) {
        const defered = Q.defer();

        let method    = options.body ? 'POST' : options.method || this.method,
            form      = options.isForm,
            rawBody   = options.isRawBody,
            parseUri  = options.parseUri,
            multiple  = options.parseMultiple,
            files     = options.files  || [],
            query     = options.query  || {},
            body      = options.body   || {},
            reqopts   = {};

        query = this._parseRequired(query);
        body  = this._parseRequired(body);

        if(multiple)
            body = this._parseMultiple(body);

        if(parseUri)  {
            this._parseUri((Object.keys(query).length > 0 ? query : body));
        }

        body = lib.clearArgs(body);

        reqopts = {
            method: method,
            url:    this.endpoint,
            qs:     query
        }

        if(this.auth)    reqopts.auth    = this.auth;
        if(this.headers) reqopts.headers = this.headers

        if(rawBody) {
            this.headers['content-type'] = 'application/x-www-form-urlencoded';
            reqopts.body = this._rawBody(body);
        }

        if(form)
            reqopts.formData = body;

        if(!reqopts.body) {
            this.headers['content-type'] = 'application/json';
            reqopts.body = JSON.stringify(body);
        }

        if(Object.keys(files).length) {
            reqopts.formData = body;

            for(let file in files) {
                let { 
                    stream, 
                    fpath 
                } = this._download(files[file]);

                reqopts.formData['photo'] = stream;
                fs.unlink(fpath, () => {});
            }

            delete reqopts.body;
        }

        reqopts.headers = this.headers;

        request(reqopts, (err, response, reslut) => {
            if(!err && (response.statusCode == 200 || response.statusCode == 201)) 
                defered.resolve(lib.safeParse(reslut));
            else 
                defered.reject(lib.safeParse(err || reslut || response.statusCode));
        });

        return defered.promise;
    }

    /**
     * Parse required fields
     * Required fields format: {'$key': 'value'}
     * Throws error if required fields is not filled
     *
     * @param {Object} object - request data
     *
     * @return {Object} clear request data
     */

    _parseRequired(object) {
        let _object = {},
            fill    = [];

        for(let prop in object) {
            let value = object[prop];

            if(prop[0] == '$') {
                prop = prop.slice(1);
                //if(!value) fill.push(prop);
                if(!value) fill.push(lib.toCamelCase(prop));
            }

            _object[prop] = value;
        }

        if(fill.length > 0) 
            throw new Error('Please, fill in required fields: ' + fill.join(', '));

        return _object;
    }

    _parseMultiple(object) {
        let muli = {};

        for(let prop in object) {
            if(!object[prop]) continue;

            if(/\*/.test(prop)) {
                try {
                    muli[prop] = JSON.parse(object[prop]);
                    delete object[prop];
                } catch(e) {
                    throw new Error('Invalid JSON data: ' + object[prop]);
                }
            }
        }

        for(let key in muli) {
            for(let index in muli[key]) {
                let objkey = key.replace('*', index);
                object[objkey] = muli[key][index];
            }
        }

        return object;
    }

     /**
     * Build raw post string
     *
     * @param {Object} body - request body
     *
     * @return {String} query string
     */

    _rawBody(body) {
        let bodyString = '';

        for(let prop in body) {
            if(body[prop]) bodyString += `&${prop}=${body[prop]}`;
        }

        return bodyString.slice(1);
    }

    _parseUri(query) {
        for(let key in query) {
            this.endpoint = this.endpoint.replace(':' + key, query[key])
        }
    }

    /**
     * Download a file
     *
     * @param {String} file - File
     *
     * @return {Stream} 
     */

    _download(file) {
        let attach = spawn(process.execPath, [require.resolve('./download.js'), file, this.storage]);
    
        if(!attach.stderr.toString()) {
            let response = JSON.parse(attach.stdout.toString());
            var fn       = path.resolve('./lib', response.message);

            if(response.err) {
                throw new Error('Bad file!', res, {to});
                return;
            }

            return {
                fpath:  fn,
                stream: fs.createReadStream(fn),
            }

        } else {
            if(/Invalid/.test(attach.stderr.toString())) throw new Error('Invalid URI.')
            console.log('Error with download.js!', attach.stderr.toString());
            throw new Error('Error. Please, call support.');
        }
    }
}

module.exports = Api;