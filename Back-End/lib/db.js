
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const app = require('./app')
const { get } = require('./app')

const store =  {
  channels: {
  },
  messages: {
  }
}
// const level = require('level')
// const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      store.channels[id] = channel
      // await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    list: async () => {
      return Object.keys(store.channels).map( (id) => {
        const channel = clone(store.channels[id])
        channel.id = id
        return channel
      })
      // return new Promise( (resolve, reject) => {
      //   const channels = []
      //   db.createReadStream({
      //     gt: "channels:",
      //     lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
      //   }).on( 'data', ({key, value}) => {
      //     channel = JSON.parse(value)
      //     channel.id = key.split(':')[1]
      //     channels.push(channel)
      //   }).on( 'error', (err) => {
      //     reject(err)
      //   }).on( 'end', () => {
      //     resolve(channels)
      //   })
      // })
    },
    update: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      store.channels[id] = merge(original, channel)
    },
    delete: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    }
  },
  messages:{
    create: async(message) =>{
      if(!message.content) throw Error('Invalid message')
      creation=Date.now()
      store.messages[creation]=message
      await db.put(`messages:${creation}`, JSON.stringify(message))
      return merge(message, {creation: creation})
    },
    list: async() => {
      Object.keys(store.messages).map( (creation) => {
        const message = clone(store.messages[creation])
        message.creation = creation
        return message
        /*return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: "messages:",
          lte: "messages" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          message.creation = key.split(':')[1]
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })*/
    })
  },
   update: (creation, content) => {
     const original = store.messages[creation]
     if(!original) throw Error('Unregistered message creation')
     store.messages[creation] = merge(original, content)
   },
   delete: (creation, content) => {
     const original = store.messages[creation]
     if(!original) throw Error('Unregistered message creation')
     delete store.messages[creation]
   }
    
  },
  admin: {
    clear: async () => {
      store.channels = {}
      store.messages={}
      //await db.clear()
    }
  }
}
