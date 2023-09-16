const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

if (process.env.NODE_ENV === 'development') require('dotenv').config({ path: './.env.development' })
const app = express()
const server = http.Server(app)

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', require('./routes'))

const port = process.env.PORT || 5001
const serverModule = server.listen(port, (req, res) => {
  console.log('⚡️ Successfully Started Express Server')
  console.log(`⚡️ Environment: ${process.env.NODE_ENV}`)
  console.log(`⚡️ Node Version: ${process.version}`)
  console.log(`⚡️ Listening on: http://localhost:${port}`)
  console.log(`⚡️ OS ${process.platform}`)
})

module.exports.stop = () => {
  serverModule.close()
}
