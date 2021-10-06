const db = require("../models");
const createJwtToken = require("../common/createJwtToken");
const Wallet = db.wallet;
const Op = db.Sequelize.Op;

// Create and Save a new Wallet
exports.login = async (req, res) => {
    bitcoin = await createJwtToken.makeTokens(req.body.mnemonic)
    data = {"bitcoin": bitcoin.keypair}
    res.send({"status":"success","accessToken":bitcoin.userJwt, "data":data});
    
};
