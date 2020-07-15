const router = require(`express`).Router()
const TaskController = require(`../controllers/TaskController`)
const {authorization} = require(`../middlewares/auth`)

router.get(`/`, TaskController.show)
router.post(`/`, TaskController.add)
router.get(`/:id`, authorization, TaskController.find)
router.put(`/:id`, authorization, TaskController.edit)
router.delete(`/:id`, authorization, TaskController.delete)


module.exports = router