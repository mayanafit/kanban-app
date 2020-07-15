
function errorHandler(err, _, res, _) {
    console.log(err)
    let statuscode = 500
    let message = `Internal Server Error. ${err}`

    if (err.name === `SequelizeValidationError`) {
        let errors = err.errors.map(error => error.message)
        statuscode = 400
        message = errors
    } else if (err.name === `SequelizeUniqueConstraintError`) {
        statuscode = 400
        message = `This email is already registered. Please input another email.`
    } else if (err.name === `otherError`) {
        statuscode = err.statusCode
        message = err.message
    } else if (err.name === `JsonWebTokenError`) {
        statuscode = 401
        message = `Please login first!`
    }

    res.status(statuscode).json({message})
}

module.exports = errorHandler