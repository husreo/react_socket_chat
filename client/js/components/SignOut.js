// deprecated
import React, { Component, PropTypes } from 'react';
import * as Actions from '../actions/Actions';
import { connect } from 'react-redux';
import * as UserAPIUtils from '../utils/UserAPIUtils';
const socket = io();

@connect(state => ({
  user: state.auth.user
}))
export default class SignOut extends Component {

  static propTypes = {
    user: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { dispatch, user } = this.props;
    const payload = {
      username: user,
      channel: 'Lobby'
    };
    if (user) {
      socket.emit('logout');
      dispatch(Actions.stopTyping(user));
      dispatch(actions.removeUserFromChannel(user));
      UserAPIUtils.removeUserFromChannel(payload);
    }
    dispatch(Actions.signOut());
  }
  render() {
    return (
      <div>
        Signed out!
      </div>
    );
  }
}

//
// export default class LogoutContainer {
//
//   componentWillMount() {
//     const { user } = this.props;
//     console.log(user);
//     console.log('^from CWM logoutcontainer^')
//   }
//   render() {
//     const { dispatch, user } = this.props;
//     console.log(user);
//     console.log('^render from logoutcontainer^')
//     const actions = bindActionCreators(Actions, dispatch);
//     return(
//       <Logout actions={actions} user={user}/>
//     )
//   }
// }
