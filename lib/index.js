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
  res.send(channelList.list())
})

app.get('/channel/:id', (req, res) => {
  res.send(channelList.get())
})

app.listen(config.port, () => {
  console.log(`Chat is waiting for you at http://localhost:${config.port}`)
})
