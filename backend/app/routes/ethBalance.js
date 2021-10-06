const wallet = require("../controllers/wallet");
var router = require("express").Router();

module.exports = app => {

  
  router.post("/", wallet.getEthBalance);

  app.use("/api/ethBalance", router);
};