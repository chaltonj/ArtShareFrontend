var multipart = require("parse-multipart");

module.exports = async function (context, req) {
    var bodyBuffer = Buffer.from(req.body);
    var boundary = multipart.getBoundary(req.headers['content-type']);

    // parse the body
    var parts = multipart.Parse(bodyBuffer, boundary);
    context.res = { body : { name : parts[0].filename, type: parts[0].type, data: parts[0].data.length}}; 
    context.done();
    
};
