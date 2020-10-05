'use strict'

require('dotenv').config()
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 5000

app.use(compression())
app.use(cors())
app.use(express.json())
app.use(helmet())
if (app.get('env') === 'development') {
	app.use(morgan('dev'))
}

app.use('*', async (req, res, next) => {
	res.status(404)
	next(new Error('page not found'))
})

app.use(async (err, req, res, next) => {
	const statusCode = res.statusCode || 500
	res
		.status(statusCode)
		.json({ error: err.message })
})

app.listen(port, console.log(`listening on *:${ port }`))
