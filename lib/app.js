
const db = require('./db')
const express = require('express')
const app = express()

app.use(require('body-parser').json())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

app.get('/channels', async (req, res) => {
  const channels = await db.channels.list()
  res.json(channels)
})

app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel)
})

app.get('/channels/:id', (req, res) => {
  const channel = db.channels.get(req.body)
  res.json(channel)
})

app.put('/channels/:id', (req, res) => {
  const channel = db.channels.update(req.body)
  res.json(channel)
})
//--MESSAGE--\\
app.post('/channels/:id/messages', async(req,res) =>{
  const message = await db.messages.create(req.body)
  res.status(201).json(message)
})

app.get('/channels/:id/messages', async (req,res) =>{
  const message = await db.messages.list(req.body)
  res.status(200).json(message)
})

module.exports = app
