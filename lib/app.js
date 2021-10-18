const db = require('./db')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(require('body-parser').json())

app.get('/', (req, res) => {
  res.send(['<h1>ECE DevOps Chat</h1>'].join(''))
})

//channels model
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

// users model
app.get('/users', async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const users = await db.users.create(req.body)
  res.status(201).json(users)
})

app.get('/users/:id', (req, res) => {
  const user = db.users.get(req.params.id) // get is not a function
  res.json(user)
})

app.put('/users/:id', (req, res) => {
  const user = db.users.update(req.body)
  res.json(user)
})

//messages

app.get('/channels/:id/messages', async (req, res) => {
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})

module.exports = app
