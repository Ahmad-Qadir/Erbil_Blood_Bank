const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        res.status(401).send("Unauthorized: Access is denied due to invalid credentials, No Token Provided");
    try {
        const decoded = jwt.verify(token, config.get("myprivatekey"));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("incorrect or Invailed Token!")
    }

}

