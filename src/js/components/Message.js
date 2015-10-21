import React from 'react';
import Constants from '../Constants';

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
    var clazz = 'message-container';
    if(message.author==='__ME__'){
      clazz += ' author-me';
    }
    if(message.status === Constants.STATUS_MESSAGE_NOT_CONFIRMED){
      clazz += ' not-confirmed';
    }
    return (
      <div className={clazz}>
        <div className="message">{message.text}</div>
        <div
          className="date">{message.date.getHours()}:{message.date.getMinutes()}:{message.date.getSeconds()}.{message.date.getMilliseconds()}</div>
      </div>
    );
  }
});
