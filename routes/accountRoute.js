//Needed Resources
const express = require("express")
const router = new express.Router()
const acctController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

// build the login form page
router.get("/login", utilities.handleErrors(acctController.buildLogin))

// build the registration form page
router.get("/register", utilities.handleErrors(acctController.buildRegister))

// register new account
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(acctController.registerAccount)
)

module.exports = router