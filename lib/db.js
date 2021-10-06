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
    return data.channels
  },

  get: (id) => {
    for (let i = 0; i < data.channels.length; i++) {
      if (id == data.channels[i].id) {
        // if the id received matches with an id in the DB return its channel name
        return data.channels[i].name
      }
    }
  }
}
