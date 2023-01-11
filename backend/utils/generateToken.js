const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id},"keshav123",{
        expiresIn:"300d",
    })
};

module.exports = generateToken;