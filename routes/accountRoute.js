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

// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    (req, res) => {
      res.status(200).send('login process')
    }
  )

// router.post(
//     "/login",
//     regValidate.loginRules(),
//     regValidate.checkLoginData,
//     utilities.handleErrors(acctController.loginAccount)
//   )

module.exports = router