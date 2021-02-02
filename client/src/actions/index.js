import axios from 'axios';
import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN,
  AUTH_ERROR,
  DASHBOARD_GET_DATA } from './types';


/* NEW USER REGISTRATION */
//Trigger server API for Google Authentication
export const oauthGoogle = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:8000/users/oauth/google', {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem('JWT_TOKEN', res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;
  };
}

//Trigger server API for Facebook Authentication
export const oauthFacebook = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:8000/users/oauth/facebook', {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem('JWT_TOKEN', res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;
  };
}

//Trigger server API for Local Authentication
export const signUp = data => {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:8000/users/signup', data);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email already exists'
      })
    }
  };
}

/* EXISTING USER LOGIN */
export const signIn = data => {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:8000/users/signin', data);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Invalid credentials!!'
      })
    }
  };
}

//Return User data and display on successful authentication
export const getSecret = () => {
  return async dispatch => {
    try {
      const res = await axios.get('http://localhost:8000/users/v1/current')
      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.current_integer
      })
    } catch(err) {
      console.error('err', err)
    }
  }
}

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    })
  };
}
