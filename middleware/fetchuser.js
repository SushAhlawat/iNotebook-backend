const jwt = require("jsonwebtoken");
const JWT_SECRET = 'Harryisagoodb$oy';

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send("Invalid request!");
    }
    const data = jwt.verify(token, JWT_SECRET);
    if(!data){
        return res.status(401).send("Invalid request!");
    }
    req.user = data.user;
    next();
}

module.exports = fetchuser;