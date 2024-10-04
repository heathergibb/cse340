exports.throwError = (req, res, next) => {
    const error = new Error("THIS IS A TEST!")
    error.status = 500
    throw error
}

