const express = require("express");
const { google } = require("googleapis");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // res.render("")
})

app.post("/formSubmit", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    // Create client instance for authentication
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({version: "v4", auth: client });

    // Get metadata about spreadsheet
    const rowData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: "1SGFz0ZKzK5hE834FsjUINFxxEUFEq6fi4zHbBLzv_Wk",
        range: "Sheet1!A:H"
    })

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: "1SGFz0ZKzK5hE834FsjUINFxxEUFEq6fi4zHbBLzv_Wk",
        range: "Sheet1!A:H",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [req.body.firstName]
            ]
        }
    })

    res.send(rowData.data.values);
    console.log(req.body);
});

app.listen(5000, (req, res) => console.log("running on 5000"))
