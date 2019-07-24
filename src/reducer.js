const initialState = {
  authKey: localStorage.getItem("0.0.0_is_auth"),
  loading: false,
  error: null
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'AUTH_SUCCESS':
      localStorage.setItem("0.0.0_is_auth", action.payload)
      return {
        ...state,
        authKey: action.payload,
        loading: false
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        authKey: null,
        error: action.payload,
        loading: false
      };
    case 'SIGNOUT_SUCCESS':
      localStorage.removeItem("0.0.0_is_auth")
      return {
        ...state,
        authKey: null,
        loading: false
      };
    case 'LOAD_FAILURE':
    case 'CREATE_FAILURE':
    case 'UPDATE_FAILURE':
    case 'DELETE_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
