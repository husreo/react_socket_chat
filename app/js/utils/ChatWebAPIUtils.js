var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var request = require('superagent');
var Cookies = require('cookies-js');

module.exports = {

  getAllMessages: function() {

    var welcomeMessage = JSON.parse(localStorage.getItem('messages'));

    var userName = Cookies.get('username')
    var serverReq =
      request
        .get('/api/dashboard/' + userName)
        .end(function(err, res) {
          if(err) {
            return console.log(err);
          }
          // console.log(res.body);
          ChatServerActionCreators.receiveAll(res.body);
        }.bind(this));
    ChatServerActionCreators.receiveAll(welcomeMessage);


    // simulate success callback

  },

  getAllFriends: function(callback) {
    var currentEAT = Cookies.get('eat');
    request
    .get('/api/contacts')
    .set('eat', currentEAT)
    .end(function(err, res) {
      if(err) {
        return console.log(err);
      }
      // Cookies.set('friendzz', res.body);
      // localStorage.setItem('friends', res.body);
      callback(res.body)
    });
  },

  createMessage: function(message, threadName) {

    // console.log('ChatWebAPIUtils');
    // console.log(message.sendMessageTo);
    // console.log(message.authorName);
    // var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var threadName = message.sendMessageTo ? message.sendMessageTo : message.authorName;
    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp,
      users: [message.authorName, message.sendMessageTo]
    };

    request
    .post('/api/messages/createmessage')
    .send(createdMessage)
    .end(function(err, res) {
      if(err) {
        return console.log(err);
      }
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    }.bind(this));

    // rawMessages.push(createdMessage);
    // localStorage.setItem('messages', JSON.stringify(rawMessages));
  },

  createThread: function(message, threadName) {

    // console.log('ChatWebAPIUtils');
    // console.log(message.sendMessageTo);
    // console.log(message.authorName);
    // var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var threadName = message.sendMessageTo ? message.sendMessageTo : message.authorName;
    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp,
      users: [message.authorName, message.sendMessageTo]
    };

    request
    .post('/api/messages/createmessage')
    .send(createdMessage)
    .end(function(err, res) {
      if(err) {
        return console.log(err);
      }
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    }.bind(this));

    // rawMessages.push(createdMessage);
    // localStorage.setItem('messages', JSON.stringify(rawMessages));
  },

  updateMessageOwners: function(message) {

    var currentEAT = Cookies.get('eat');
    var username = Cookies.get('username');

    var patchpackage = {
      username: username,
      threadID: message.threadID
    }

    request
    .patch('/api/users/' + username)
    .set('eat', currentEAT)
    .send(patchpackage)
    .end(function(err, res) {
      if(err) {
        return console.log(err);
      }

    })
  }
}
