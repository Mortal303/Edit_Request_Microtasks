/** 
 * Api Domain Router Handler
*/
var express = require("express");
var domainController = require("./domain.controller.js");
const domainRouter = express.Router();

domainRouter
  .route("/validateUrl")
  .post(domainController.validateUrl);

domainRouter
  .route("/submitEditRequest")
  .get(domainController.submitEditRequest);

domainRouter
  .route("/validateSource")
  .post(domainController.validateSource);

module.exports = domainRouter;