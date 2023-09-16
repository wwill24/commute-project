const { google } = require('googleapis')

// Create the auth instance
function getAuth () {
  return new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })
}

// Get the client instance
async function getClient () {
  const auth = getAuth()
  return await auth.getClient()
}

module.exports = {
  getAuth,
  getClient
}
