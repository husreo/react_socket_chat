import * as types from '../constants/ActionTypes';
import Cookies from 'cookies-js';
import superagent from 'superagent';
import * as UserAPIUtils from '../utils/UserAPIUtils';

export function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  }
}

export function addChannel(channel) {
  return {
    type: types.ADD_CHANNEL,
    channel
  };
}

export function changeChannel(channel) {
  return {
    type: types.CHANGE_CHANNEL,
    channel
  }
}

export function login(user) {
  console.log(user);
  return {
    types: [types.AUTH_LOGIN,
      types.AUTH_LOGIN_SUCCESS,
      types.AUTH_LOGIN_FAIL],
    promise: UserAPIUtils.login(user),
    user
  };
}

export function register(user) {
  console.log(user);
  return {
    types: [types.AUTH_REGISTER,
      types.AUTH_REGISTER_SUCCESS,
      types.AUTH_REGISTER_FAIL],
    promise: UserAPIUtils.register(user),
    user
  }
}

export function logout() {
  return {
    types: [types.AUTH_LOGOUT,
      types.AUTH_LOGOUT_SUCCESS,
      types.AUTH_LOGOUT_FAIL],
    promise: UserAPIUtils.logout()
  }
}
