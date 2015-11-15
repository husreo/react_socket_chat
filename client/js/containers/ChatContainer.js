import React, { Component, PropTypes } from 'react';
import * as Actions from '../actions/Actions';
import Chat from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @connect(state => ({
//   messages: state.messages.data,
//   channels: state.channels.data,
//   activeChannel: state.activeChannel,
//   user: state.auth.user,
//   typers: state.typers
// }))
class ChatContainer extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    // dispatch(Actions.loadInitialMessages());
    dispatch(Actions.fetchMessages());
    dispatch(Actions.loadInitialChannels());
  }
  render() {
    const actions = bindActionCreators(Actions, this.props.dispatch);
    return (
      <Chat {...this.props} actions={actions} />
    );
  }
}
ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired,
  activeChannel: PropTypes.object.isRequired,
  typers: PropTypes.array.isRequired
}
console.log(connect);
function mapStateToProps(state) {
  return {
      messages: state.messages.data,
      channels: state.channels.data,
      activeChannel: state.activeChannel,
      user: state.auth.user,
      typers: state.typers
  }
}
export default connect(mapStateToProps)(ChatContainer)
