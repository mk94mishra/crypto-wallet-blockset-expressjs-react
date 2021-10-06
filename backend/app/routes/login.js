const login = require("../controllers/login");
var router = require("express").Router();

module.exports = app => {
  
  router.post("/", login.login);

  app.use("/api/login", router);
};