import React, { Component, PropTypes } from 'react';
import * as UserAPIUtils from '../utils/UserAPIUtils';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const socket = io.connect();

@connect(state => ({
  user: state.auth.user
}))

export default class SignIn extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    React.findDOMNode(this.refs.usernameInput).focus();
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, user } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    if(this.state.username.length < 1) {
      React.findDOMNode(this.refs.usernameInput).focus()
    }

    if(this.state.username.length > 0 && this.state.password.length < 1) {
      React.findDOMNode(this.refs.passwordInput).focus();
    }

    if(this.state.username.length > 0 && this.state.password.length > 0) {
      var userpass = {
        username: this.state.username,
        password: this.state.password
      }

      const payload = {
        username: this.state.username,
        id: Date.now()
      }

      //exactly the same way we do it in the SignUp component, we hydrate the state with data fetched from the DB
      // const fetchData = () => {
      //   UserAPIUtils.addUserToChannel(payload)
      //   UserAPIUtils.getAllChannels(actions)
      //   UserAPIUtils.getAllUsersInChannel(actions)
      //   UserAPIUtils.getAllMessages(actions)
      // }

      // const loadMessages = actions.loadInitialMessages()
      // const signIn = actions.signIn(userpass)
      // const transitionToChat = this.context.router.transitionTo('/chat')
      // actions.signIn(userpass)
      // .then(fetchData())
      // console.log(actions.signIn(userpass))
      // actions.loadInitialMessages()
      // console.log(actions.loadInitialMessages())
      dispatch(Actions.signIn(userpass)).then(() => {
        dispatch(Actions.loadInitialMessages())
        })
        .then(() => {
          dispatch(Actions.loadInitialChannels())
        })
        .then(() => {
          dispatch(Actions.loadUsersOnline())
        })
        .then(() => {
          this.context.router.transitionTo('/chat')
        })
        .then(() => {
          dispatch(Actions.userIsOnline(payload))
        })





      // actions.signIn(userpass)
      // .then(actions.loadInitialMessages())
      // const rawMessages = actions.loadInitialMessages()
      // rawMessages.forEach(function(message) {
      //   actions.receiveRawMessage(message)
      // });
      // .then(transitionToChat)
      // .then(loadMessages)
      // .then(fetchData())
      // .then(this.context.router.transitionTo('/chat'))
      this.setState({ username: '', password: ''});
    }
  }

  render() {
    let labelStyle = {color: 'black'};
    let buttonStyle = {background: '#23a608', width: '100%', height: '4rem', marginTop: '2rem'}
    let signInStyle = {justifyContent: 'center', display: 'flex'}
    return (
      <div className='wrapper'>
        <header style={{display: 'flex', justifyContent: 'center'}} className='header'>
          Sign In to Chat
        </header>
        <main style={{display: 'flex', justifyContent: 'center'}} className='main'>
          <form onSubmit={::this.handleSubmit}>
            <section>
              <label style={labelStyle}>Username</label>
                <div>
                  <input ref="usernameInput" type="text" name="username" placeholder='Enter username' value={this.state.username} onChange={::this.handleChange}/>
                </div>
            </section>
            <section>
              <label style={labelStyle}>Password</label>
                <div>
                  <input ref="passwordInput" type="password" name="password" placeholder='Enter password' value={this.state.password} onChange={::this.handleChange}/>
                </div>
            </section>
            <section style={signInStyle}>
              <button style={buttonStyle} name="submitButton" type="submit" ><p style={{color: 'white', margin: '0', padding: '0', fontSize:'1.5em'}} >Sign In</p></button>
            </section>
          </form>
        </main>
        <aside className="aside aside-1"></aside>
        <aside className="aside aside-2"></aside>
      </div>
    );
  }
}
