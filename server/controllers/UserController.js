const {User} = require(`../models`)
const {comparePass} = require(`../helpers/bcrypt`)
const {encode} = require(`../helpers/jwt`)
const {OAuth2Client} = require('google-auth-library');

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
                        email: data.email,
                        organization: data.organization
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

    static google(req, res, next) {
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let payload;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            payload = ticket.getPayload();
            // console.log(payload)
            const userid = payload['sub'];
            return User.findOne({where: {email: payload.email}})
        })
        .then(data => {
            if (data) {
                return data
            } else {
                let dataUser = {
                    name: payload.name,
                    email: payload.email,
                    password: `12345`
                }
                return User.create(dataUser)
            }
        })
        .then(user => {
            const access_token = encode({
                id: user.id,
                email: user.email,
                name: user.name,
                organization: user.organization
            })
            return res.status(200).json({access_token})
        })
        .catch(err => {
            next(err)
        })

    }
}

module.exports = UserController