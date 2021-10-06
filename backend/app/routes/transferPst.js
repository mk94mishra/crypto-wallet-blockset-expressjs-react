const transferPst = require("../controllers/transferPst");
var router = require("express").Router();

module.exports = app => {

  
  router.post("/", transferPst.transfer);

  app.use("/api/transferPst", router);
};