import React, { Component } from 'react';
import Message from './components/Message';

import { AUTHORS } from './utils/constants'

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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ message: event.target.value })
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { author, message } = this.state;
    const request = await fetch('https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=tPgPUVxilfuY', {
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
    const request = await fetch('https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=tPgPUVxilfuY');
    const allMessages = await request.json();
    this.setState({ allMessages })
  }

  componentDidMount() {
    this.fetchAllMessages()
  }

  componentDidUpdate() {
    this.fetchAllMessages()
  }

  render() {
    const { author: currentAuthor, message, allMessages } = this.state;
    return (
      <div className="App">
        <h1>You are logging in as {currentAuthor}</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={message} />
          <button type="submit">Submit</button>
        </form>
        {allMessages && allMessages.map((item) => (
          <Message messageItem={item} currentAuthor={currentAuthor} />
        ))}
      </div>
    );
  }
}


export default App;
