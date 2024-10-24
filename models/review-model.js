const pool = require("../database/")

/* ***************************
*  Get review by review_id
* ************************** */
async function getReviewByReviewId(review_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.review WHERE review_id = $1`,
      [review_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getReviewsByReviewId error " + error)
  }
}

/* ***************************
  *  Get all reviews by inv_id ordered newest to oldest
  * ************************** */
async function getReviewsByInvId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT r.*, a.account_firstname, a.account_lastname 
        FROM review AS r 
        JOIN account AS a ON
          r.account_id = a.account_id
        WHERE r.inv_id = $1
        ORDER BY r.review_date DESC`,
      [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("getReviewsByInvId error " + error)
  }
}

/* ***************************
  *  Get all reviews by account_id
  * ************************** */
async function getReviewsByAccountId(account_id) {
  try {
    const data = await pool.query(
      `SELECT r.*, i.inv_year, i.inv_make, i.inv_model FROM review AS r
      JOIN inventory AS i ON i.inv_id = r.inv_id
      WHERE r.account_id = $1
      ORDER BY review_id ASC `,
      [account_id]
    )
    return data.rows
  } catch (error) {
    console.error("getReviewsByAccountId error " + error)
  }
}

/* ***************************
  *  Get all reviews by account_id
  * ************************** */
 async function addReview(review_text, inv_id, account_id) {
  try {
    const sql = `INSERT INTO review (review_text, inv_id, account_id) VALUES ($1, $2, $3) RETURNING *`
    return await pool.query(sql, [review_text, inv_id, account_id])
  } catch (error) {
    console.error("addReview error " + error)
  }
 }

  module.exports = {
    getReviewByReviewId,
    getReviewsByInvId,
    getReviewsByAccountId,
    addReview
  };