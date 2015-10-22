import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import MesagCounter from './components/MessageCounter'

ReactDOM.render(<MessageList />, document.getElementById('message-list'));
ReactDOM.render(<MessageInput />, document.getElementById('message-input'));
ReactDOM.render(<MesagCounter />, document.getElementById('message-counters'));
