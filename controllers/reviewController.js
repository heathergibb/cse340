const utilities = require("../utilities")
const reviewModel = require("../models/review-model")
const invCont = require("../controllers/invController")

const reviewCont = {}
/* ***************************
 *  Add New Review
 * ************************** */
reviewCont.addReview = async function(req, res, next) {
    const { review_text, inv_id, account_id } = req.body

    try {

        const addResult = await reviewModel.addReview(review_text, inv_id, account_id)

        if (!addResult) {
            req.flash("notice", "Something went wrong. Failed to add review.")
        }
        // refresh the page with the new review
        res.redirect(`/inv/detail/${inv_id}`)

    } catch (error) {
        console.error("Error adding review: ", error)
    }
}

module.exports = reviewCont