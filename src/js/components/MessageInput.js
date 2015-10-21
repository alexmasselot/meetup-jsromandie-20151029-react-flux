import React from 'react';
import ReactDOM from 'react-dom';
import ActionCreator from '../actions/MessageActionCreators';
import MessageStore from '../stores/MessageStore';
import Input from 'react-bootstrap/lib/Input';
import _ from 'lodash';

export default React.createClass({
  _onChange() {
    this.setState(MessageStore.getAllMessages());
  },

  componentDidMount() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
  },

  postMessage(message){
    ActionCreator.postMessage(message);
  },

  newMessageKeyDown(event, evt){
    let _this = this;
    let text = event.target.value.trim();
    if (event.key === 'Enter' && text !== '') {
      _this.postMessage({text: text, author: '__ME__'});

      event.target.value = '';
    }
  },

  render() {
    return <Input type="text"
                  ref="newMessage"
                  onKeyDown={this.newMessageKeyDown}
                  label="new message"
                  placeholder="new message, then enter"
      />
  }
});
