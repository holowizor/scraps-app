import axios from 'axios';
import { API } from './const'

export const authenticate = (name, password) => {
  return dispatch => {
    // dispatch(loading())
    axios
      .post(`${API}/api/jwt/authenticate`, { name, password })
      .then(res => { dispatch(authSuccess(res.data)) })
      .catch(err => { dispatch(authFailure(err)) });
  }
}

const loading = () => ({
  type: 'LOADING'
})

const authSuccess = (authKey) => ({
  type: 'AUTH_SUCCESS',
  payload: authKey
})

const authFailure = (error) => ({
  type: 'AUTH_FAILURE',
  payload: error
})

export const signout = () => {
  return dispatch => {
    dispatch(signoutSuccess())
  }
}

const signoutSuccess = () => ({
  type: 'SIGNOUT_SUCCESS'
})
