const db = require("../models");
const ownToken = require("../common/ownToken");
const Wallet = db.wallet;
const Op = db.Sequelize.Op;

exports.getEthBalance = (req,res) => {
    ownToken.checkBalance(req.body.account,(err,balance,eth_balance) => {
        console.log("ljgkjgj")
        res.send({"status":"success", "data":{balance:balance,eth_balance:eth_balance}});
    })
}
