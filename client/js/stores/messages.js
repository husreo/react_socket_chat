import { ADD_MESSAGE, RECEIVE_MESSAGE, FIRST_FILTER} from '../constants/ActionTypes';

const initialState = [{
  id: 0,
  friendID: 0,
  text: 'Use Redux'
}];

export default function messages(state = initialState, action) {
  switch(action.type) {
    case ADD_MESSAGE:
      // console.log(action);
      // console.log('new message created!');
      return [{
        id: (action.id)? action.id : Date.now(),
        friendID: action.friendID,
        text: action.text
      },...state];

    case RECEIVE_MESSAGE:
      console.log(action);
      console.log('message received from server into state');
      return [{
        id: action.id,
        friendID: action.friendID,
        text: action.text
      },...state];

    default:
      return state;
  }
}
