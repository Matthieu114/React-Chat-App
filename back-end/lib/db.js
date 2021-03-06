const {v4: uuid} = require('uuid');
const {clone, merge} = require('mixme');
const microtime = require('microtime');
const level = require('level');
const db = level(__dirname + '/../db');

module.exports = {
  channels: {
    create: async (channel) => {
      if (!channel.name) throw Error('Invalid channel');
      const users = [];
      let promise = new Promise((resolve, reject) => {
        if (!channel.usersId) resolve();
        channel?.usersId?.forEach(async (user, index) => {
          const myUser = await db.get(`users:${user}`);
          users.push(JSON.parse(myUser));
          if (index === channel.usersId.length - 1) resolve();
        });
      });

      const id = uuid();
      promise.then(async () => {
        await db.put(
          `channels:${id}`,
          JSON.stringify(merge(channel, {usersId: users}))
        );
      });

      return merge(channel, {id: id});
    },
    get: async (id) => {
      if (!id) throw Error('Invalid id');
      const data = await db.get(`channels:${id}`);
      const channel = JSON.parse(data);
      return merge(channel, {id: id});
    },
    list: async () => {
      return new Promise((resolve, reject) => {
        const channels = [];
        db.createReadStream({
          gt: 'channels:',
          lte: 'channels' + String.fromCharCode(':'.charCodeAt(0) + 1)
        })
          .on('data', ({key, value}) => {
            channel = JSON.parse(value);
            channel.id = key.split(':')[1];
            channels.push(channel);
          })
          .on('error', (err) => {
            reject(err);
          })
          .on('end', () => {
            resolve(channels);
          });
      });
    },
    update: async (id, channel) => {
      if (!id) throw Error('invalid Id');
      if (!channel.name) {
        throw Error('Invalid Channel: ' + channel);
      }
      const oldChannel = await db.get(`channels:${id}`);
      const newChannel = merge(JSON.parse(oldChannel), {name: channel.name});

      const users = [];
      //get users info from their id and fill the users array with the info
      let promise = new Promise((resolve, reject) => {
        if (!channel.usersId) resolve();
        channel?.usersId?.forEach(async (user, index) => {
          const myUser = await db.get(`users:${user}`);
          users.push(JSON.parse(myUser));
          if (index === channel.usersId.length - 1) resolve();
        });
      });

      promise.then(async () => {
        if (users.length === 0) {
          await db.put(`channels:${id}`, JSON.stringify(newChannel));
        } else {
          const newArray = [].concat(JSON.parse(oldChannel).usersId, users);
          await db.put(
            `channels:${id}`,
            JSON.stringify(merge(newChannel, {usersId: newArray}))
          );
        }
      });
    },
    delete: async (id) => {
      if (!id) throw Error('invalid Id');
      await db.del(`channels:${id}`);
    }
  },
  messages: {
    create: async (channelId, message) => {
      if (!channelId) throw Error('Invalid channel');
      if (!message.author) throw Error('Invalid message');
      if (!message.content) throw Error('Invalid message');
      creation = microtime.now();
      await db.put(
        `messages:${channelId}:${creation}`,
        JSON.stringify({
          author: message.author,
          content: message.content
        })
      );
      return merge(message, {channelId: channelId, creation: creation});
    },
    list: async (channelId) => {
      return new Promise((resolve, reject) => {
        const messages = [];
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(':'.charCodeAt(0) + 1)
        })
          .on('data', ({key, value}) => {
            message = JSON.parse(value);
            const [, channelId, creation] = key.split(':');
            message.channelId = channelId;
            message.creation = creation;
            messages.push(message);
          })
          .on('error', (err) => {
            reject(err);
          })
          .on('end', () => {
            resolve(messages);
          });
      });
    },
    delete: async (channelId, messageCreation) => {
      if (!channelId) throw Error('Invalid Channel');
      if (!messageCreation) throw Error('no message creation');

      await db.del(`messages:${channelId}:${messageCreation}`);
    },

    update: async (channelId, messageCreation, message) => {
      if (!channelId) throw Error('Invalid Channel');
      if (!messageCreation) throw Error('no message creation');
      if (!message) throw Error('no message content');

      await db.put(
        `messages:${channelId}:${messageCreation}`,
        JSON.stringify(message)
      );
    }
  },
  users: {
    create: async (user) => {
      if (!user.username) throw Error('Invalid user');
      const id = uuid();
      await db.put(`users:${id}`, JSON.stringify(user));
      return merge(user, {id: id});
    },
    get: async (id) => {
      if (!id) throw Error('Invalid id');
      const data = await db.get(`users:${id}`);
      const user = JSON.parse(data);
      return merge(user, {id: id});
    },

    list: async () => {
      return new Promise((resolve, reject) => {
        const users = [];
        db.createReadStream({
          gt: 'users:',
          lte: 'users' + String.fromCharCode(':'.charCodeAt(0) + 1)
        })
          .on('data', ({key, value}) => {
            user = JSON.parse(value);
            user.id = key.split(':')[1];
            users.push(user);
          })
          .on('error', (err) => {
            reject(err);
          })
          .on('end', () => {
            resolve(users);
          });
      });
    },
    update: async (id, user) => {
      if (!id) throw Error('Invalid id');
      await db.put(`users:${id}`, JSON.stringify(user));
      return merge(user, {id: id});
    },
    delete: (id, user) => {
      const original = store.users[id];
      if (!original) throw Error('Unregistered user id');
      delete store.users[id];
    }
  },
  admin: {
    clear: async () => {
      await db.clear();
    }
  }
};
