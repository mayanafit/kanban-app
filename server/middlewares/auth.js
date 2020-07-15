const {User, Task} = require(`../models`)
const {decode} = require(`../helpers/jwt`)


const authentication = (req, res, next) => {
    let access_token = req.headers.access_token
    let userData = decode(access_token)
    req.user = userData

    User.findOne({where: {email: userData.email}})
    .then(data => {
        if (data) {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

const authorization = (req, res, next) => {
    let id = req.params.id
    let UserId = req.user.id
    let error = {
        name: `otherError`,
        statusCode: 403,
        message: `Sorry you don't have access to this.`
    }

    Task.findByPk(id)
    .then(data => {
        if (data) {
            if (data.UserId === UserId) {
                next()
            } else {
                throw error
            }
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {authentication, authorization}