const { Router } = require('express')
const { body } = require('express-validator')
const { google } = require('googleapis')
const { getClient, getAuth } = require('../lib/googleClient')
const router = Router()

router.get('/', (req, res) => {
  // returns a list of users
  // ! admin only
})

router.post('/', [
  // validates that the body has a username and password
  body('username').exists().isString()
  // body('phoneNumber').exists().isString(),
  // body('homeAddress').exists().isString(),
  // body('destinationAddress').exists().isString(),
  // body('destinationName').exists().isString(),
  // body('arrivalTime').exists().isString(),
  // body('days').exists().isString()
], async (req, res) => {
  // creates a new user
  const {
    username,
    phoneNumber,
    homeAddress,
    destinationAddress,
    destinationName,
    arrivalTime,
    days
  } = req.body

  // ! do something with the user object (save to google sheets)
  const client = await getClient()
  const auth = getAuth()

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
        [username]
      ]
    }
  })

  console.log(rowData.data.values)

  // ! respond back to the UI with the user object
  res.json({
    users: [{
      username,
      phoneNumber,
      homeAddress,
      destinationAddress,
      destinationName,
      arrivalTime,
      days
    }]
  })
})

router.get('/:id', (req, res) => {
  // returns a single user
  // ! make sure they can only see themselves unless they are an admin
})

router.delete('/:id', (req, res) => {
  // deletes a user
  // ! make sure they can only delete themselves unless they are an admin
})

module.exports = router
