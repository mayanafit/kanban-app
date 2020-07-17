const {Task, User} = require(`../models`)

class TaskController {

    static show(req, res, next) {
        let UserId = req.user.id
        let userName = req.user.name

        Task.findAll({ include:[User], order: [[`createdAt`, `ASC`]]})
        .then(data => {
            res.status(200).json({data, userId})
        })
        .catch(err => {
            next(err)
        })
    }

    static find(req, res, next) {
        let id = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }

        Task.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw error
            }
        })
        .catch(err => {
            next(err)
        })
    }
    
    static add(req, res, next) {
        let UserId = req.user.id
        let addTask = Task.generateForm(req.body)
        let newTask = {... addTask, UserId}

        Task.create(newTask) 
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }


    static edit(req, res, next) {
        let id = req.params.id
        let editTask = Task.generateForm(req.body)
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }

        Task.update(editTask, {where: {id}, returning: true})
        .then(data => {
            if (data[0] !== 0) {
                res.status(200).json(data[1][0])
            } else {
                throw error
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let id = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }
        let deletedData;

        Task.findByPk(id)
        .then(data => {
            if (data) {
                deletedData = data
                return Task.destroy({where: {id}})
            } else {
                throw error
            }
        })
        .then(data => {
            res.status(200).json(`Successfully delete Task with title '${deletedData.title}'!`) 
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController