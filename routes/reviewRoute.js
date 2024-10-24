//Needed Resources
const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const reviewValidate = require("../utilities/review-validation")

// Route to build inventory details by inv_id view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));


// add review
router.post(
    "/add",
    reviewValidate.reviewRules(),
    reviewValidate.checkNewReviewData,
    utilities.handleErrors(reviewController.addReview)
)

// update review
// router.post(
//     "/edit-review", 
//     reviewValidate.reviewRules(),
//     reviewValidate.checkEditReviewData,
//     utilities.handleErrors(reviewController.editReview))

// // delete review
// router.post(
//     "/delete-review", 
//     utilities.handleErrors(reviewController.deleteReview))

module.exports = router