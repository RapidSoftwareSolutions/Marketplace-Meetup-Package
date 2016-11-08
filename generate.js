const fs   = require("fs");
const lib  = require("./lib/lib/functions");
const url  = require('url');
const path = require("path");

const customArgs = {
    lon:          'longitude',
    lat:          'latitude',
    groupUrlname: 'groupUrlName',
    groupnum:     'groupNum',
    gid:          'groupId',
    mid:          'memberId',
    optToPay:     'optionToPay',
    maxwidth:     'maxWidth',
    headcount:    'headCount',
    anon:         'anonymous',
    bid:          'boardId',
    did:          'discussionId'
}

const customNames = {
    dashboard:           'getDashboard',
    getDiscussion:       'getSingleDiscussion',
    getEvent:            'getSingleEvent',
    getEventComment:     'getSingleEventComment',
    getGroup:            'getSingleGroup',
    getMember:           'getSingleMember',
    editMember:          'editSignleMember',
    getProfile:          'getSingleProfile',
    getRSVP:             'getSingleRSVP',
    getComments:         'getGroupComments'
}

const multiFields = {
    'postEvent|question':     'addNewQuestions',
    'editEvent|question':     'addNewQuestions',
    'editEvent|questionedit': 'editQuestions',
    'postProfile|answer':     'provideAnswer',
    'editProfile|answer':     'provideAnswer',
    'postRSVP|answer':        'provideAnswer',
    'editGroup|question':     'addNewQuestions',
    'editGroup|uri':          'serviceUri',
    'editGroup|questionedit': 'editQuestions'
}

let main = module.exports = function() {
    let docsFile   = path.join(__dirname, "docs.json"),
        pointsFile = path.join(__dirname, "endpoints.json"),
        metaFile   = path.join(__dirname, "metadata.json"),
        api        = path.join(__dirname, "api.json"),
        docs       = JSON.parse(fs.readFileSync(docsFile, "utf8")).docs,
        endpoints  = JSON.parse(fs.readFileSync(pointsFile, "utf8")),
        metadata   = {
            package: "Meetup", 
            tagline: "Meetup Package",
            accounts: {
                domain: 'meetup.com',
                credentials: [ 'accessToken' ]
            },
            image: "https://a248.e.akamai.net/secure.meetupstatic.com/photos/event/8/f/1/d/highres_454596637.jpeg",
            repo: "https://github.com/RapidSoftwareSolutions/Marketplace-Meetup-Package",
            description: 'The Meetup API provides simple RESTful HTTP and streaming interfaces for extending your community using the Meetup platform from your own apps.',
            blocks: []
        },
        nameHash = {},
        apiObj   = {};

    for(let point in endpoints) {
        let res = url.parse(endpoints[point].resource)
        if(!/ws:|wss:/.test(res.protocol)) {
            let key = endpoints[point].method.toUpperCase() + res.path;
            nameHash[key] = point;
        }
    }

    for(let doc in docs) {
        let mathodName = '',
            metaBlock = {},
            apiBlock = {},
            methodParams = {};

        doc = docs[doc];

        let key = doc.http_method + doc.path;

        if(nameHash[key] && doc.host !== 'stream') {
            methodName = nameHash[key];
        }
        else continue;

        let { params, path, http_method, desc } = doc,
            urlParts  = path.split(/\/:(\w+)/ig),
            urlParams = [];

        metaBlock.name = customNames[methodName] || methodName;
        metaBlock.description = desc;
        metaBlock.args = [];

        apiBlock.method = http_method;
        apiBlock.res = endpoints[methodName].resource;
        apiBlock.args = [];
        apiBlock.cargs = [];

        if(endpoints[methodName].multipart_photo) apiBlock.multipartPhoto = true;

        metaBlock.args.push({
            name: 'accessToken',
            type: 'credentials',
            info: 'Required: OAuth2 Access Token'
        });

        for (var i = urlParts.length - 1; i >= 0; i--) {
            if(urlParts[i] !== '' && urlParts[i][0] !== '/') urlParams.push(urlParts[i]);
        }

        if(urlParams.length) {
            for (var i = urlParams.length - 1; i >= 0; i--) {
                let name = lib.toCamelCase(urlParams[i]);

                apiBlock.args.push('$' + name);
                apiBlock.cargs.push(customArgs[name] || name);

                metaBlock.args.push({
                    name: customArgs[name] || name,
                    type: 'String',
                    info: ''
                })
            }
        }

        for(let key in params) {
            let parr    = key.split(', '),
                _parr   = parr[0].split(','),
                metaArg = {};

            if(_parr.length > 1) parr = _parr;

            for (var i = parr.length - 1; i >= 0; i--) {
                let paramName = parr[i],
                    camelName;

                metaArg = {
                    type: 'String',
                    info: params[key]
                }

                if(paramName[0] == '*') metaArg.info = 'Recomended: ' + metaArg.info;

                paramName = paramName.replace('*', '');

                if(/{/.test(paramName)) {
                    paramName = paramName.replace(/\{([^)]+)\}/, '*');
                    let key = (methodName + '|' + paramName).replace('_', '').replace('_', '').replace('*', '');

                    if(multiFields[key]) camelName = multiFields[key]
                    else console.log(methodName, key);

                    metaArg.type = 'JSON';
                    apiBlock.multiprop = true;
                }

                camelName = camelName || lib.toCamelCase(paramName.replace('$', ''));

                metaArg.name = customArgs[camelName] || camelName;

                apiBlock.args.push(paramName);
                apiBlock.cargs.push(customArgs[camelName] || camelName);
                metaBlock.args.push(metaArg);
            }
        }

        metadata.blocks.push(metaBlock);
        apiObj[customNames[methodName] || methodName] = apiBlock;
    }

    lib.safeSave(api, JSON.stringify(apiObj, undefined, 2))
    lib.safeSave(metaFile, JSON.stringify(metadata, undefined, 2))
}

main();