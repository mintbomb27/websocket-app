import React from 'react';
import './App.css';
import {io} from "socket.io-client"

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      text: '',
      chat: [],
      user: ''
    }
    this.hello = this.hello.bind(this);

  }

  componentDidMount(){
    this.socket = io('ws://localhost:8080')
    this.socket.on('message', msg => {
      console.log(msg)
      var chatNow = this.state.chat;
      chatNow.push(<p id='chat-text'>{msg}</p>);
      this.setState({
        chat: chatNow
      })
    })
  }

  hello(){//sends Message to the Server
    console.log(this.state.text);
    this.socket.emit('message',`${this.state.user}: ${this.state.text}`);
  }

  render(){
    return (
      <div key = 'app' className='App'>
        <input id='user' onChange={event => this.setState({user: event.target.value})} placeholder='Username: ' type="text"></input>
        <input id='message' onChange={event => this.setState({text: event.target.value})} placeholder='Message: ' type="text"></input>
        <button onClick={this.hello}>Send</button>
        <div id='chatbox'>
          {this.state.chat}
        </div>
      </div>
    );
  }
}

export default App;
