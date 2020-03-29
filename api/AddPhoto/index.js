var multipart = require("parse-multipart");

module.exports = async function (context, req) {
    var bodyBuffer = Buffer.from(req.body);
    context.res = { body: req.body, status: 500};
    context.done();
    // var boundary = multipart.getBoundary(req.headers['content-type']);

    // // parse the body
    // var parts = multipart.Parse(bodyBuffer, boundary);
    // if (parts == null || parts === undefined || parts.length <= 0)
    // {
    //     console.error(parts);
    //     context.res = { status: 500, body: "parts were undefined" }
    // }
    // else
    // {
    //     context.res = { body : { name : parts[0].filename, type: parts[0].type, data: parts[0].data.length}};
    // }

    // context.done();
};
