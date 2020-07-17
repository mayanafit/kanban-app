const router = require(`express`).Router()
const taskRoutes = require(`./taskRoutes`)
const UserController = require(`../controllers/UserController`)
const {authentication} = require(`../middlewares/auth`)

router.get('/', (req, res) => res.send('Hello World!'))
router.post(`/register`, UserController.register)
router.post(`/login`, UserController.login)
router.post(`/login/google`, UserController.google)
router.use(authentication)
router.use(`/tasks`, taskRoutes)

module.exports = router