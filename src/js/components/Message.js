import React from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Input from 'react-bootstrap/lib/Input';

export default React.createClass({
  getDefaultProps() {
    return {
      message: {
        text: 'no_message',
        author: null,
        date: null,
        isFromMe: false
      }
    };
  },

  handleToggle(task) {
    if (this.refs.checkbox.getChecked()) {
      ActionCreator.completeTask(task);
    }
  },

  render() {
    var message = this.props.message;
    return (
      <div className={'message-container'+((message.author==='__ME__')?' author-me':'')}>
        <div className="message">{message.text}</div>
        <div
          className="date">{message.date.getHours()}:{message.date.getMinutes()}:{message.date.getSeconds()}.{message.date.getMilliseconds()}</div>
      </div>
    );
  }
});
