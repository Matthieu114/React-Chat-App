const express = require('express')
const app = express()
let channelList = require('./db')
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

app.get('/', (req, res) => {
  res.send(homePageContent)
})

app.get('/channels', (req, res) => {
  let html = channelList.list()
  console.log(html)

  res.send(html)
})

app.get('/channel/:id', (req, res) => {
  res.send(`<h1>Welcome to channel ${req.params.id} </h1>`)
})

app.listen(config.port, () => {
  console.log(`Chat is waiting for you at http://localhost:${config.port}`)
})

module.exports = {
  // mock data that will be replaced with database
  data: {
    channels: [
      {
        id: '1',
        name: 'Channel 1'
      },
      {
        id: '2',
        name: 'Channel 2'
      },
      {
        id: '3',
        name: 'Channel 3'
      }
    ]
  }
}
