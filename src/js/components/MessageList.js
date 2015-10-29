import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import MessageStore from '../stores/MessageStore';

export default React.createClass({
  getInitialState(){
    return {
      messages: []
    };
  },
  _onChange() {
    this.setState({messages: MessageStore.getAllMessages()});
  },

  componentDidMount() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
  },

  /**
   * scroll to bottom
   */
  componentDidUpdate() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  },

  render() {
    var messages = this.state.messages;
    return (
      <div className="message-list">
        {messages.map(msg =>
            <Message message={msg} key={msg.id}/>
        )}
      </div>
    );
  }
});
