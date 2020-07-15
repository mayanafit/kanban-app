const {User} = require(`../models`)
const {comparePass} = require(`../helpers/bcrypt`)
const {encode} = require(`../helpers/jwt`)

class UserController {

    static register(req, res, next) {
        let newUser = User.generateForm(req.body)

        User.create(newUser)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        let error = {
            name: `otherError`,
            statusCode: 400,
            message: `Invalid Email or Password! Please try again!`
        }

        User.findOne({where: {email: user.email}})
        .then(data => {
            console.log(data)
            if (!data) {
                throw error
            } else {
                if (comparePass(user.password, data.password)) {
                    let access_token = encode({
                        id: data.id,
                        name: data.name,
                        email: data.email
                    })
                    res.status(200).json({access_token})
                } else {
                    throw error
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController