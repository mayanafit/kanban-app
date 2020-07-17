require('dotenv').config()
const cors = require(`cors`)
const express = require('express')
const routes = require(`./routes`)
const error = require(`./middlewares/errHandler`)
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(error)

app.listen(port, () => console.log(`KANBAN listening at http://localhost:${port}`))
