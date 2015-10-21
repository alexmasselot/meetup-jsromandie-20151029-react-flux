import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

ReactDOM.render(<MessageList />, document.getElementById('message-list'));
ReactDOM.render(<MessageInput />, document.getElementById('message-input'));
