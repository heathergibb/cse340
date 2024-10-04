exports.throwError = (req, res, next) => {
    const error = new Error("THIS IS A TEST!", {cause: "Congratulations! You've successfully tested the Error Link functionality!"})
    error.status = 500
    throw error
}

