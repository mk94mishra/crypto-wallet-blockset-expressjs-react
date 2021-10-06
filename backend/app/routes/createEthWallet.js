const createEthWallet = require("../controllers/createEthWallet");
var router = require("express").Router();

module.exports = app => {

  // Create a new Wallet
  router.post("/", createEthWallet.create);

  app.use("/api/createEthWallet", router);
};