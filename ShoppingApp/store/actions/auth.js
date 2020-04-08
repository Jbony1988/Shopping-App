import axios from 'axios';
import {AsyncStorage} from 'react-native';
// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';

export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({type: AUTHENTICATE, userId: userId, token: token});
  };
};

export const signup = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const formData = {
    email,
    password,
    returnSecureToken: true,
  };

  console.log(formData);
  const body = JSON.stringify(formData);

  try {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBh41b74EPUSVhxaPWfdAqgoHMRTPC5Ixc',
      body,
      config,
    );

    if (response.status !== 200) {
      throw new Error('Something went wrong');
    }

    const resData = response.data;
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn, 10) * 1000,
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000,
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  } catch (err) {
    let message = 'Something went wrong!';
    const errorData = err.response.data;
    const errorId = errorData.error.message;
    if (errorId === 'EMAIL_EXISTS') {
      message = 'This email exist already';
    }
    console.log(errorId);
    throw new Error(`${message}`);
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const formData = {
    email,
    password,
    returnSecureToken: true,
  };

  console.log(formData);
  const body = JSON.stringify(formData);

  try {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBh41b74EPUSVhxaPWfdAqgoHMRTPC5Ixc',
      body,
      config,
    );

    if (response.status !== 200) {
      const errorData = response.error;
      console.log(errorData);
    }

    const resData = response.data;
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn, 10) * 1000,
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000,
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  } catch (err) {
    let message = 'Something went wrong!';
    const errorData = err.response.data;
    const errorId = errorData.error.message;
    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This email can not be found';
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not valid';
    }
    console.log(errorId);
    throw new Error(`${message}`);
  }
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiry: expirationDate.toISOString(),
    }),
  );
};
