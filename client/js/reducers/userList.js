import { ADD_USER_TO_CHANNEL, ADD_USER_TO_CHANNEL_SUCCESS, ADD_USER_TO_CHANNEL_FAIL, REMOVE_USER_FROM_CHANNEL, LOAD_USERSONLINE, LOAD_USERSONLINE_FAIL, LOAD_USERSONLINE_SUCCESS, SOCKET_IO_ADD } from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  data: []
};

// currently ADD USER TO CHANNEL = USER IS ONLINE
export default function userList(state = initialState, action) {
  switch (action.type) {

  case SOCKET_IO_ADD:
    return {...state,
      data: [...state.data, {
        username: action.user,
        id: (state.data.length === 0) ? 0 : state.data[state.data.length - 1].id + 1
      }]
    };

  case ADD_USER_TO_CHANNEL:
    return {...state,
        adding: true
      };

  case ADD_USER_TO_CHANNEL_SUCCESS:

    // commented out and will add validation back in later..

    // if(state.data.filter(user =>
    //   user.username === action.user.name
    // ).length !== 0) {
    //   return state
    // } else {
    //   return {...state,
    //     data: [...state.data, {
    //       username: action.user.name,
    //       id: (state.data.length === 0) ? 0 : state.data[state.data.length - 1].id + 1
    //     }]
    //   }
    // }
    return {...state,
      adding: false,
      added: true,
      data: [...state.data, {
        username: action.user.username,
        id: (state.data.length === 0) ? 0 : state.data[state.data.length - 1].id + 1
      }]
    };

  case ADD_USER_TO_CHANNEL_FAIL:
    return {...state,
      adding: false,
      added: false,
      error: action.error
    };

  case REMOVE_USER_FROM_CHANNEL:
    return {...state,
      data: state.data.filter(data => {
        return data.username !== action.user;
      })
    };

  case LOAD_USERSONLINE:
    return {...state,
      loading: true
    };

  case LOAD_USERSONLINE_SUCCESS:
    return {...state,
      loading: false,
      loaded: true,
      data: action.result
    };

  case LOAD_USERSONLINE_FAIL:
    return {...state,
      loading: false,
      loaded: false,
      error: action.error,
    };

  default:
    return state;
  }
}
