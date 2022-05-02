const httpSignature = require('http-signature');

function verifyRequest(req, res, next) {
    try {
        const parsed = httpSignature.parseRequest(req);
        const result = httpSignature.verifyHMAC(parsed, process.env.CLIENT_SECRET);

        if (result === true) {
            next();
        } else {
            res.status(401).end();
        }
    } catch (e) {
        res.status(401).end();
    }
}

module.exports = verifyRequest;