import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from './Channels';
import superagent from 'superagent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';
import TypingListItem from './TypingListItem';
const socket = io();

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

//componentDidMount is a lifecycle method that is called once right after initial render
  componentDidMount() {
    const { actions } = this.props;
    //The 'new bc message' socket event lets other users connected to the socket listen to the message
    socket.on('new bc message', function(msg) {
      actions.receiveRawMessage(msg);
    });
    socket.on('typing bc', function(username) {
      if(username) {
        actions.typing(username);
      }
    });
    socket.on('stop typing bc', function(username) {
      if(username) {
        actions.stopTyping(username);
      }
    });
  }

//componentDidUpdate is a lifecycle method called when the component gets updated, not called on initial render
  componentDidUpdate() {
    const messageList = React.findDOMNode(this.refs.messageList);
    messageList.scrollTop = messageList.scrollHeight;
  }

  handleSave(newMessage) {
    const { actions } = this.props;
    if(newMessage.text.length !== 0) {
      actions.addMessage(newMessage);
    }
  }

  changeActiveChannel(channel) {
    const { actions } = this.props;
    actions.changeChannel(channel)
  }

  render() {
    const { messages, channels, actions, activeChannel, user, dispatch, typers} = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeChannel.id);
    // const filteredTypers = typing.filter(user => user.typing === true)

    return (
      <main>
        <div className="message-section">
          <strong>{activeChannel.name}</strong>
          <ul className="message-list" ref="messageList">

            {filteredMessages.map(message =>
              <MessageListItem message={message} key={message.id} user={user} actions={actions} />
            )}
          </ul>
          <MessageComposer activeChannel={activeChannel} user={user} onSave={::this.handleSave} />

          {typers.length === 1 &&
          <span className="typing-list">
            <TypingListItem username={typers[0]} key={1}/>
            <span> is typing</span>
          </span>}

          {typers.length === 2 &&
          <span className="typing-list">
            <TypingListItem username={typers[0]} key={2}/>
            <span> and </span>
            <TypingListItem username={typers[1]} key={3}/>
            <span> are typing</span>
          </span>}

          {typers.length > 2 &&
          <span className="typing-list">Several people are typing
          </span>}
        </div>
        <div>
          <strong>CHANNELS</strong>
          <Channels onClick={::this.changeActiveChannel} channels={channels} actions={actions} />
        </div>
      </main>
    );
  }
}

@connect(state => ({
  messages: state.messages,
  channels: state.channels,
  activeChannel: state.activeChannel,
  user: state.auth,
  typers: state.typers
}))
export default class ChatContainer {
  render() {
    const { messages, channels, activeChannel, dispatch, user, typers} = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <Chat {...this.props} actions={actions} />
    );
  }
}

// {typers.length === 2 &&
//   <span className="typing-list"> {typers[0].map(username =>
//   <TypingListItem username={username} typers={typers}/>)} &&
//   <span> and </span> &&
//  {typers[1].map(username =>
//   <TypingListItem username={username} typers={typers}/>
// )} && <span> are typing</span>
// </span>}
//
// {typers.length === 2 &&
//   <span className="typing-list" ref="typersList"> {typers.map(username =>
//     console.log(username)
//     console.log(typers)
//   <TypingListItem username={username} typers={typers}/>)}
//   <span> are typing</span>
// </span>}
