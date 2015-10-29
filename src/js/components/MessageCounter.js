import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import MessageStore from '../stores/MessageStore';

export default React.createClass({
  getInitialState(){
    return {
      counts: MessageStore.counts()
    };
  },
  _onChange() {
    this.setState({counts: MessageStore.counts()});
  },

  componentDidMount() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
  },


  render() {
    var counts = this.state.counts;
    return (
      <div className="message-counter">
        <div>
          <span className="label">Received</span>
           <span className="badge received">{counts.received}</span>
        </div>
        <div>
          <span className="label">Sent</span>
          <span className="badge not-confirmed">{counts.sentNotConfirmed}</span>
           / <span className="badge confirmed">{counts.sentConfirmed}</span>
        </div>
      </div>
    );
  }
});
