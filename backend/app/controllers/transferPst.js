const db = require("../models");
const ownToken = require("../common/ownToken");
const Wallet = db.wallet;
const Op = db.Sequelize.Op;

// transfer
exports.transfer = (req, res) => {
    sender_account = req.body.sender_account;
    sender_private_key = req.body.sender_private_key;
    // transfer PST
    ownToken.transferToken(req.body.sender_account,req.body.reciever_account, req.body.sender_private_key, req.body.token, (txerr,txHash) => {
        ownToken.checkBalance(sender_account,(err,balance) => {
        balance = balance
        console.log(err,balance)
            if(txerr){
                res.send({
                    message:
                    txerr.message || "Some error occurred while retrieving."
                });
            }
            res.send({"status":"success", "txhash":txHash});
        });                                                     
    });  
}
