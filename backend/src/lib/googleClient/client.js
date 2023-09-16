const { google } = require('googleapis')

global.googleClient = null

async function client () {
  try {
    if (!global.googleClient) {
      const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
      })
      global.googleClient = await auth.getClient()
    }

    return global.googleClient
  } catch (err) {
    console.error(err)
    global.googleClient = null
    throw err
  }
}

module.exports = client
