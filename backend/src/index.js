const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const { google } = require('googleapis')

if (process.env.NODE_ENV === 'development') require('dotenv').config({ path: './.env.development' })
const app = express()
const server = http.Server(app)

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', require('./routes'))

app.get('/', (req, res) => {
// res.render(')
})

app.post('/formSubmit', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })

  // Create client instance for authentication
  const client = await auth.getClient()

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: 'v4', auth: client })

  // Get metadata about spreadsheet
  const rowData = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Sheet1!A:H'
  })

  googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Sheet1!A:H',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        [req.body.firstName]
      ]
    }
  })

  // send to google
  // ??

  res.send(rowData.data.values)
  console.log(req.body)
})

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
