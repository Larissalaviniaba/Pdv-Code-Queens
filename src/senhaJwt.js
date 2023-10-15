require("dotenv").config();
const senhaJwt = process.env.JWT_PASSWORD;

module.exports = senhaJwt;
