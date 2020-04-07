export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
import Orders from '../../models/orders';
import axios from 'axios';
import Order from '../../models/orders';

export const addOrder = (cartItems, totalAmount) => async (
  dispatch,
  getState,
) => {
  const date = new Date();
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const token = getState().auth.token;
  const userId = getState().auth.userId;

  const formData = {
    cartItems,
    totalAmount,
    date: date.toISOString(),
  };

  console.log(formData);
  const body = JSON.stringify(formData);

  // any async code you want!
  try {
    const response = await axios.post(
      `https://shopping-app-948db.firebaseio.com/orders/${userId}.json?auth=${token}`,

      body,
      config,
    );
    const resData = response.data;
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  } catch (error) {
    throw new Error('Something went wrong!');
  }
};

export const getOrders = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;

  try {
    const response = await axios.get(
      `https://shopping-app-948db.firebaseio.com/orders/${userId}.json`,
    );

    if (response.status !== 200) {
      throw new Error('Something went wrong!');
    }
    const resData = response.data;
    console.log(resData);

    const loadedOrders = [];

    for (const key in resData) {
      loadedOrders.push(
        new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date),
        ),
      );
    }

    dispatch({
      type: SET_ORDERS,
      orders: loadedOrders,
    });
  } catch (err) {
    // Send to custom server analytics;
    throw err;
  }
};
