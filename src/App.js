import React, { Component, createRef } from 'react';
import Message from './components/Message';

import { AUTHORS, REQUEST_URL } from './utils/constants'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      author: AUTHORS[Math.floor(Math.random() * AUTHORS.length)],
      message: '',
      currentMessage: null,
      allMessages: null,
      error: null
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
    try {
      const request = await fetch(REQUEST_URL, {
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
      this.setState({ currentMessage, message: '' })
    } catch (error) {
      this.setState({ error })
    }
  }

  async fetchAllMessages() {
    const { allMessages: allMessagesStates } = this.state;
    try {
      const request = await fetch(REQUEST_URL);
      const allMessages = await request.json();
      if (allMessagesStates && allMessagesStates.length === allMessages.length) return;
      this.setState({ allMessages });
      this.messageWrapperRef.current.scrollTop = this.messageWrapperRef.current.scrollHeight;
    } catch (error) {
      this.setState({ error })
    }
  }

  componentDidMount() {
    this.fetchAllMessages();
  }

  componentDidUpdate() {
    this.fetchAllMessages();
  }

  render() {
    const { author: currentAuthor, message, allMessages, error } = this.state;
    return (
      <div className="container">
        <h1 className="app-current-author">You are logging in as <span>{currentAuthor}</span></h1>
        <div ref={this.messageWrapperRef} className="message-wrapper">
          <div className="container-inner">
            {allMessages && allMessages.map((item) => (
              <Message key={item._id} messageItem={item} currentAuthor={currentAuthor} />
            ))}
          </div>
        </div>
        <form className="app-form" onSubmit={this.handleSubmit}>
          <div className="container-inner">
            <input placeholder="Message" className="app-form-control" onChange={this.handleChange} value={message} />
            <button className="app-form-btn" type="submit" disabled={!message}>Send</button>
          </div>
        </form>
        <p style={{ color: 'red' }}>{error && error.message}</p>
      </div>
    );
  }
}


export default App;
