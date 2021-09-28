module.exports = {
  data: {
    // mock data that will be replaced with database
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
  },

  list: function () {
    // return all the channels
  },

  get: function () {
    // retrieve a channel by id
  }
}
