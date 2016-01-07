import { ADD_MESSAGE, RECEIVE_MESSAGE, LOAD_MESSAGES, LOAD_MESSAGES_SUCCESS, LOAD_MESSAGES_FAIL} from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  data: []
};
export default function messages(state = initialState, action) {
  switch (action.type) {
  case ADD_MESSAGE:
    return {...state,
      data: [...state.data, {
        id: (state.data.length === 0 ) ? 0 : state.data[state.data.length - 1].id + 1,
        channelID: action.message.channelID,
        text: action.message.text,
        user: action.message.user,
        time: action.message.time
      }]
    };
  case RECEIVE_MESSAGE:
    return {...state,
      data: [...state.data, {
        id: (state.data.length === 0 ) ? 0 : state.data[state.data.length - 1].id + 1,
        channelID: action.message.channelID,
        text: action.message.text,
        user: action.message.user,
        time: action.message.time
      }]
    };
  case LOAD_MESSAGES:
    return {...state,
      loading: true
    };
  case LOAD_MESSAGES_SUCCESS:
    return {...state,
      loading: false,
      loaded: true,
      data: [...action.json]
    };
  case LOAD_MESSAGES_FAIL:
    return {...state,
      loading: false,
      loaded: false,
      error: action.error,
      data: [...state.data]
    };
  default:
    return state;
  }
}
