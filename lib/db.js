let ejs = require('ejs')

// mock data that will be replaced with database
data = {
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

module.exports = {
  list: () => {
    // return all the channels
    let channelArray = new Array()
    data.channels.forEach((channel) => {
      channelArray.push(channel.name)
    })
    let html = ejs.render('<%= channel.join(", "); %>', {
      channel: channelArray
    })

    return html
  },

  get: () => {
    // retrieve a channel by id
  }
}
