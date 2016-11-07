const fs       = require('fs');
const path     = require('path');
const request  = require('request');
const filename = require('./functions').randomString();

const uri      = process.argv[2];
const path     = process.argv[3];
const target   = path.resolve(path, filename);

let file = fs.createWriteStream(target);

let response = (err, message) => {
    process.stdout.write(JSON.stringify({ err, message }));
    process.exit(0);
}

let stream = request
    .get(uri)
    .on('error', (err) => {
        response(err);
    })
    .pipe(file);

stream.on('finish', () => response(null, target));