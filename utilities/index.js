const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
//   console.log(data)
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the select list of classification items
* ************************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList = `<select name="classification_id" id="classificationList"` 
  classificationList += `required value="<%- locals.classification_id %>">`
  classificationList += `<option value=''>Choose a Classification</option>`
  data.rows.forEach((row) => {
    classificationList += `<option value="${row.classification_id}"`
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += ` selected `
    }
    classificationList += `>${row.classification_name}</option>`
  })
  classificationList += `</select>`
  return classificationList
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = `<ul id="inv-display">`
      data.forEach(vehicle => { 
        grid += `<li class="car-card">`
        grid += `<div class="image-container">`
        grid += `<a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">`
        grid += `<img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">`
        grid += `</a></div>`
        grid += `<div class="namePrice">`
        grid += `<hr>`
        grid += `<h2 class="car-card-heading">`
        grid += `<a href="../../inv/detail/${vehicle.inv_id}" title="View ` 
        grid += `${vehicle.inv_make} ${vehicle.inv_model} details">` 
        grid += `${vehicle.inv_make} ${vehicle.inv_model}</a>`
        grid += `</h2>`
        grid += `<span>$${new Intl.NumberFormat(`en-US`).format(vehicle.inv_price)}</span>`
        grid += `</div>`
        grid += `</li>`
      })
      grid += `</ul>`
    } else { 
      grid += `<p class="notice">Sorry, no matching vehicles could be found.</p>`
    }
    return grid
  }

  Util.buildInventoryDetailGrid = async function(data) {
    let grid
    grid = `<div id=details-container>`
    grid += `<div class="image-container">`
    grid += `<img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model} on CSE Motors" id="vehicle-img-large">` 
    grid += `</div>`
    grid += `<section id="vehicle-details">`
    grid += `<h2 class="section-title">${data.inv_make} ${data.inv_model} Details</h2>`
    grid += `<table><tbody>`
    grid += `<tr><td><span class="details-label">Price: $${new Intl.NumberFormat('en-US').format(data.inv_price)}</span></td></tr>`
    grid += `<tr><td><span class="details-label">Description: </span>`
    grid += `<span class="details-text">${data.inv_description}</span></td></tr>`
    grid += `<tr><td><span class="details-label">Color: </span>`
    grid += `<span class="details-text">${data.inv_color}</span></td></tr>`
    grid += `<tr><td><span class="details-label">Miles: </span>`
    grid += `<span class="details-text">${new Intl.NumberFormat('en-US').format(data.inv_miles)}</span></td></tr>`
    grid += `</tbody></table></section></div>`
    return grid
  }

  Util.buildErrorMessage = async function(error) {
    let message
    message = `<div id="error-page">`
    message += `<h2>${error.message}</h2>`
    message += `<img src="images/site/error.webp" width="600" height="400" loading="lazy" alt="Photo of 1 + 1 = 3 on chalkboard" id="error-img">`
    message += `<div><a href="https://www.pexels.com/photo/1-1-3-text-on-black-chalkboard-374918/" target="_blank" id="photo-source">Photo by George Becker</a></div>`
    message += `</div>`
    return message
  }

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util