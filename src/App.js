import React, { Component, createRef } from 'react';
import Message from './components/Message';

import { AUTHORS, REACT_APP_UNIQUE_TOKEN } from './utils/constants'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      author: AUTHORS[Math.floor(Math.random() * AUTHORS.length)],
      message: '',
      currentMessage: null,
      allMessages: null
    }
    this.messageWrapperRef = createRef();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ message: event.target.value })
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { author, message } = this.state;
    const request = await fetch(`https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=${REACT_APP_UNIQUE_TOKEN}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author,
        message
      })
    });
    const currentMessage = await request.json();
    this.setState({ currentMessage })
  }

  async fetchAllMessages() {
    const { allMessages: allMessagesStates } = this.state;
    const request = await fetch('https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=tPgPUVxilfuY');
    const allMessages = await request.json();
    if (allMessagesStates && allMessagesStates.length === allMessages.length) return;
    this.setState({ allMessages });
  }

  componentDidMount() {
    this.fetchAllMessages();
  }

  componentDidUpdate() {
    this.fetchAllMessages();
    this.messageWrapperRef.current.scrollTop = this.messageWrapperRef.current.scrollHeight;
  }

  render() {
    const { author: currentAuthor, message, allMessages } = this.state;
    return (
      <div className="App">
        <h1 className="app-current-author">You are logging in as <span>{currentAuthor}</span></h1>
        <div ref={this.messageWrapperRef} className="message-wrapper">
          <div className="message-wrapper-inner">
            {allMessages && allMessages.map((item) => (
              <Message key={item._id} messageItem={item} currentAuthor={currentAuthor} />
            ))}
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={message} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}


export default App;
