const db = require("../models");
const ownToken = require("../common/ownToken");
const Wallet = db.wallet;
const Op = db.Sequelize.Op;

// Create and Save a new Wallet
exports.create = (req, res) => {
    var err =''
    var mywallet = ''
    ownToken.createWallet(req.body.mnemonic,(err,mywallet) => {
        console.log(mywallet)
        res.send({"status":"success","data":mywallet});
    });
        
};
