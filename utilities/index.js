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

  Util.buildLoginForm = function() {
    let form 
    form = `<div class="form-card">
        <form id="login-form">
            <label>Email:
              <input type="email" name="account_email" class="form-input">
            </label><br>
            <label>Password:
              <input type="password" name="account_password" class="form-input">
            </label><br>
            <input type="submit" value="Login" class="form-button" title="Click here to login">
        </form>
        <div id="sign-up">
            <span>No account?</span>
            <a title="Click here to sign up" href="/account/register">Sign-up</a>
        </div>
      </div>`
    return form
  }

  Util.buildRegistrationForm = function () {
    let form
    form = `<div class="form-card">
        <form id="register-form">
            <h2>Create an Account</h2>
            <p>*All fields are required</p>
            <label>First Name:
                <input type="text" name="account_firstname" class="form-input">
              </label><br>
            <label>Last Name:
                <input type="text" name="account_lastname" class="form-input">
            </label><br>
            <label>Email:
              <input type="email" name="account_email" class="form-input">
            </label><br>
            <label>Password:
              <input type="password" name="account_password" class="form-input">
            </label><br>
            <ul id="password-note">
                Password must be:
                <li>12 characters in length, min</li>
                <li>contain at least 1 capital letter</li>
                <li>contain at least 1 number</li>
                <li>contain at least 1 special character</li>
            </ul>
            <input type="submit" value="Register" class="form-button" title="Click here to submit registration">
        </form>
    </div>`
    return form;
  }

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util