/** 
 * Api Router Handler
*/
var express = require("express");
var domainRouter = require("./resources/domain");

const restRouter = express.Router();
restRouter.use("/domain", domainRouter);

module.exports = restRouter;