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

// build the account management page
router.get("/", 
    utilities.checkLogin,
    utilities.handleErrors(acctController.buildAccountMgmt))

// create the logout path
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('jwt')
        res.redirect("/")
    })
})

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
    utilities.handleErrors(acctController.accountLogin)
  )

module.exports = router