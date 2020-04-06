import axios from 'axios';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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
    dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId});
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
    dispatch({type: LOGIN, token: resData.idToken, userId: resData.localId});
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
