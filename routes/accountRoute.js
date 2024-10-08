//Needed Resources
const express = require("express")
const router = new express.Router()
const acctController = require("../controllers/accountController")
const utilities = require("../utilities/")

router.get("/login", utilities.handleErrors(acctController.buildLogin))

module.exports = router