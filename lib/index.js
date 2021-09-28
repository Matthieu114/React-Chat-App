const express = require('express')
const app = express()
const db = require('./db')

const config = {
  port: 3000
}

const homePageContent = `<!DOCTYPE html>
<html lang="en">
  <body>
    <h1> This is the home page for the lab on ExpressJS ! </h1>
    <a href="/channels"> view all Channels </a>
  </body>
</html>`

const channelPageContent = `<!DOCTYPE html>
<html lang="en">
  <body>
    <h1> This is the home page for the lab on ExpressJS ! </h1>
    <ul><li><a href="/channel/1"> Channel 1 </a></li>
    <li><a href="/channel/2"> Channel 2 </a></li>
    <li><a href="/channel/3"> Channel 3 </a></li></ul>
  </body>
</html>`

app.get('/', (req, res) => {
  res.send(homePageContent)
})

app.get('/channels', (req, res) => {
  // List of channels
  res.send(channelPageContent)

  // Return some HTML content inside `body` with:
  // * The page title
  // * A list of every channel with a link to the channel page
  // Notes:
  // * Channels are identified by channel ids.
  // * Make sure to find the appropriate HTML tag to respect the HTML semantic
  //   of a list
})

app.get('/channel/:id', (req, res) => {
  res.send(`<h1>Welcome to channel ${req.params.id} </h1>`)
})

app.listen(config.port, () => {
  console.log(`Chat is waiting for you at http://localhost:${config.port}`)
})
