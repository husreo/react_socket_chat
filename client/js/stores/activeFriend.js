import { ACTIVATE_FRIEND } from '../constants/ActionTypes';

const initialState = 0;

export default function activeFriend(state = initialState, action) {
  switch(action.type) {
    case ACTIVATE_FRIEND:
      // console.log(action);
      return action.friendID

    default:
      return state;
  }
}
