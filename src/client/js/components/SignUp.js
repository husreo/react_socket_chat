import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/Actions';

@connect(state => ({
  welcomePage: state.welcomePage
}))

export default class SignUp extends Component {

  static propTypes = {
    welcomePage: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: this.props.welcomePage || '',
      password: '',
      confirmPassword: ''
    };
  }

  componentDidMount() {
    if (this.state.username.length) {
      this.refs.passwordInput.focus();
    } else {
      this.refs.usernameInput.focus();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;

    if (!this.state.username.length) {
      this.refs.usernameInput.focus();
    }

    if (this.state.username.length && !this.state.password.length) {
      this.refs.passwordInput.focus();
    }

    if (this.state.username.length && this.state.password.length && !this.state.confirmPassword.length) {
      this.refs.confirmPasswordInput.focus();
    }

    if (this.state.username.length && this.state.password.length && this.state.confirmPassword.length) {
      const userpass = {
        username: this.state.username,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };

      const payload = {
        username: this.state.username,
        channel: 'Lobby'
      };

      dispatch(Actions.signUp(userpass)).then(() => {
        dispatch(Actions.loadInitialMessages());
      })
      .then(() => {
        dispatch(Actions.loadInitialChannels());
      })
      .then(() => {
        dispatch(Actions.loadUsersOnline());
      })
      .then(() => {
        this.context.router.transitionTo('/chat');
      })
      .then(() => {
        dispatch(Actions.userIsOnline(payload));
      });

      this.setState({ username: '', password: '', confirmPassword: ''});
    }
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
    if (event.target.name === 'confirm-password') {
      this.setState({ confirmPassword: event.target.value });
    }
  }

  render() {
    const labelStyle = {color: 'black'};
    return (
      <div>
        <header style={{display: 'flex', justifyContent: 'center', background: '#000000', color: '#FFFFFF', flexGrow: '0', order: '0'}}>
        Sign Up
        </header>
        <main style={{display: 'flex', justifyContent: 'center'}}>
          <form onSubmit={::this.handleSubmit} onChange={::this.handleChange}>
            <section>
              <label style={labelStyle}>Username</label>
              <div>
                <input ref="usernameInput" type="text" name="username" value={this.state.username} placeholder="Enter username" onChange={::this.handleChange} />
              </div>
            </section>
            <section>
              <label style={labelStyle}>Password</label>
              <div>
                <input ref="passwordInput" type="password" name="password" value={this.state.password} placeholder="Enter password" onChange={::this.handleChange} />
              </div>
            </section>
            <section>
              <label style={labelStyle}>Confirm Password</label>
              <div>
                <input ref="confirmPasswordInput" type="password" name="confirm-password" placeholder="Enter password again" value={this.state.confirmPassword} onChange={::this.handleChange} />
              </div>
            </section>
            <section style={{justifyContent: 'center', display: 'flex'}}>
              <button style={{background: '#23a608', width: '100%', height: '4rem', marginTop: '2rem'}} onClick={::this.handleSubmit} type="submit"><p style={{color: 'white', margin: '0', padding: '0', fontSize: '1.5em'}} >Sign Up</p></button>
            </section>
          </form>
        </main>
      </div>
    );
  }
}
