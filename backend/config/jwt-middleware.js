var jwt = require('jsonwebtoken');
var secret = 'papoi';
module.exports = function (req, res, next) {
    var token = req.body.token || req.get('Authorization') || req.query.token;
    console.log(req.headers);
    if (!token) {
        return res.status(404).send({ error: 'No token found' });
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(500).send({ error: 'Invalid token' });
            } else {
                req.decoded = decoded;
                //decoded = jwt.decode(token, {complete:true});
                //console.log(req.headers);
                // req.headers.authorization = token;
                // console.log(req.headers.authorization);
                // console.log(decoded.header);
                // console.log(decoded.payload);
                next();
            }
        });
    }
}
