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
  let array = channelList.list()
  const heading = '<h1>Select one of the available channels!</h1>'
  let output = `${heading}<ul>
           ${array
             .map(
               (channel) =>
                 `<a href="/channel/${channel.id}"><li>${channel.name}</li></a>` // format the objects inside array to be represented as html list items
             )
             .join('\n')}
           </ul>`

  res.write(output)
  res.end()
})

app.get('/channel/:id', (req, res) => {
  res.send(channelList.get(req.params.id))
})

app.listen(config.port, () => {
  console.log(`Chat is waiting for you at http://localhost:${config.port}`)
})
