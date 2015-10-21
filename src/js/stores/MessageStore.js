import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import {EventEmitter} from 'events';
import MessageGenerator from '../services/MessageGenerator';

import assign from 'object-assign';
import _ from  'lodash';

// data storage
let _registeredMessages = [];
let _clientMessages = [];

let iClientId = 0;
let iServerMessageId = 0;

var messageGenerator = new MessageGenerator(['Paf']);

// what would happen when a message is received from server (typically connected to a web socket
function onMessageReceivedFromServer(message) {
  var nMessage = _.extend({}, message, {id: 'srv_' + iServerMessageId, status: Constants.STATUS_MESSAGE_CONFIRMED});
  iServerMessageId++;

  //if the message has a clientId (so was issued by the client, it must be removed from the temporary stack)
  //well, that method not reentrant, but the purpose here is to make a demo, nope?
  if(message.clientId !== undefined) {
    _clientMessages = _.filter(_clientMessages, function (msg) {
      return msg.clientId !== message.clientId;
    });
  }
  _registeredMessages.push(nMessage);

  //let everyone who registered know that the store has change
  MessageStore.emitChange();
};

//as we don't have any backnd server, we just simulate the behavior
function fakeServerPostMessage(message) {
  //in 0.5 second, the message will be received from server
  setTimeout(function () {
    onMessageReceivedFromServer(message);
  }, 500);
  // and concurrently create two random message from your friend, with random time between now and +1 second
  messageGenerator.async(2,500, function(message){
    onMessageReceivedFromServer(message);
  });
};

// post a message, that, at this moment, only contain text and author
function postMessage(content) {
  var clientId = 'client_' + iClientId;
  var message = _.extend({
    clientId: clientId,
    id: clientId,
    date: new Date(),
    status: Constants.STATUS_MESSAGE_NOT_CONFIRMED
  }, content);
  iClientId++;
  _clientMessages.push(message);
  fakeServerPostMessage(message);
  MessageStore.emitChange();
}

// Facebook style store creation.
const MessageStore = assign({}, EventEmitter.prototype, {
  // Allow Controller-View to register itself with store
  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  // triggers change listener above, firing controller-view callback
  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  },

  getAllMessages() {
    return _.flatten([_registeredMessages, _clientMessages]);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function (payload) {
    let {type, args} = payload;

    switch (type) {
      case Constants.MESSAGE_POSTED:
        let text = args.message.text.trim();
        if (text !== '') {
          postMessage({text: text, author: '__ME__'});
        }
        break;

    }
  })
});

export default MessageStore;
