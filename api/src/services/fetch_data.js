/* eslint-disable no-console */
const axios = require('axios')

function getUrl(payload) {
  const { sheetsAPIKey, sheetID, sheetName } = payload
  const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets'
  return `${baseUrl}/${sheetID}/values/'${sheetName}'?key=${sheetsAPIKey}`
}

async function fetchSpreadsheet(payload, parser) {
  let objects = []

  try {
    const response = await axios.get(getUrl(payload))
    const { values } = response.data
    objects = values.slice(1).map((row) => parser(row))
  } catch (err) {
    console.log(`error occuried while fetching ${payload.name}...`)
    console.log(err)
  }

  return objects
}

module.exports = { fetchSpreadsheet }
