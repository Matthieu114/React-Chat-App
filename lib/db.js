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
      channelArray.unshift(channel.id)
    })
    channelArray = channelArray.toString()
    console.log(channelArray)
    let chunks = channelArray.split(',')
    chunks = chunks.slice(3)
    const heading = '<h1>Select one of the available channels!</h1>'

    let output = `${heading}<ul>
          ${chunks.map((c) => `<li>${c}</li>`).join('\n')}
          </ul>`

    return output
  },

  get: () => {
    // retrieve a channel by id
  }
}
