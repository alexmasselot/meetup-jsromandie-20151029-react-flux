import React from 'react';
import MessageStore from '../stores/MessageStore';
import ActionCreator from '../actions/MessageActionCreators';
import MessageList from './MessageList';

export default React.createClass({
  _onChange() {
    this.setState(MessageStore.getAllMessages());
  },

  getInitialState() {
    return MessageStore.getAllMessages();
  },

  componentDidMount() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
  },

  handleAddTask(e) {
    let title = prompt('Enter task title:');
    if (title) {
      ActionCreator.postMessage(title);
    }
  },

  handleClear(e) {
    ActionCreator.clearList();
  },

  render() {
    let {tasks} = this.state;
    return (
      <MessageList />
    );
  }
});
