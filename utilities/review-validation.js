const utilities = require(".")
const invModel = require("../models/inventory-model")
const reviewModel = require("../models/review-model")
const { body, validationResult } = require("express-validator")
const validate = {}

  /* **********************************
  *  Review Validation Rules
  * ********************************* */
 validate.reviewRules = () => {
    return [
        body("review_text")
        .trim()
        .notEmpty()
        .withMessage("Review text required."),
    ]
 }

 validate.checkNewReviewData = async (req, res, next) => {
    const { review_text, inv_id } = req.body

    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        // req.flash("errors", error.array().map(error => error.msg))
        return res.redirect(`/inv/detail/${inv_id}`)

        // try {
        //     // rerender the page
        //     // const inv_id = req.params.invId
        //     const invData = await invModel.getInventoryByInvId(inv_id)
        //     const reviewData = await reviewModel.getReviewsByInvId(inv_id)
        //     const screen_name = (res.locals.loggedin === 1) ? `${res.locals.accountData.account_firstname.charAt(0)}${res.locals.accountData.account_lastname}` : ""
        //     const grid = await utilities.buildInventoryDetailGrid(invData)
        //     const reviews = await utilities.buildInventoryReviewSection(reviewData)
        //     let nav = await utilities.getNav()
        //     const vehicleTitle = `${invData.inv_year} ${invData.inv_make} ${invData.inv_model}`
        //     res.render("./inventory/detail", {
        //         title: vehicleTitle,
        //         nav,
        //         grid,
        //         screen_name,
        //         reviews,
        //         inv_id,
        //         errors
        //     })
        //     return
        // } catch (err) {
        //     console.error("Error rendering page:", err)
        //     res.status(500).send("Server error while rendering the page.")
        // }
    }
    next()
 }

 module.exports = validate