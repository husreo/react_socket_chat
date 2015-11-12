import React, { Component, PropTypes } from 'react';
import * as UserAPIUtils from '../utils/UserAPIUtils';
const socket = io.connect();
import strftime from 'strftime';
import { Input } from 'react-bootstrap';

export default class MessageComposer extends Component {

  static propTypes = {
    activeChannel: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: '',
      typing: false
    };
  }
  handleSubmit(event) {
    const { user } = this.props;
    const text = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      var newMessage = {
        id: Date.now(),
        channelID: this.props.activeChannel.name,
        text: text,
        user: user,
        time: strftime('%H:%M %p', new Date())
      };
      socket.emit('new message', newMessage);
      UserAPIUtils.createMessage(newMessage);
      this.props.onSave(newMessage);
      this.setState({ text: '', typing: false });
      socket.emit('stop typing');
    }
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
    if (event.target.value.length > 0 && !this.state.typing) {
      socket.emit('typing');
      this.setState({ typing: true});
    }
    if (event.target.value.length === 0 && this.state.typing) {
      socket.emit('stop typing');
      this.setState({ typing: false});
    }
  }
  render() {
    return (
      <div style={{
        zIndex: '52',
        left: '21.1rem',
        right: '1rem',
        width: '100%',
        flexShrink: '0',
        order: '2',
        height: '5rem',
        marginBottom: '0',
        marginTop: '0.5em'
      }}>
        <Input
          style={{
            height: '100%',
            fontSize: '2em'
          }}
          type="textarea"
          name="message"
          autoFocus="true"
          placeholder="Type here to chat!"
          value={this.state.text}
          onChange={::this.handleChange}
          onKeyDown={::this.handleSubmit}
        />
      </div>
    );
  }
}
