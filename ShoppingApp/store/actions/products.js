export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
import Product from '../../models/product';

import axios from 'axios';

export const deleteProduct = productId => async (dispatch, getState) => {
  const token = getState().auth.token;

  try {
    await axios.delete(
      `https://shopping-app-948db.firebaseio.com/products/${productId}.json?auth${token}`,
    );
    dispatch({type: DELETE_PRODUCT, pid: productId});
  } catch (error) {
    throw new Error('Something went wrong!');
  }
};

export const getProducts = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;

  // any async code you want!
  try {
    const response = await axios.get(
      'https://shopping-app-948db.firebaseio.com/products.json',
    );

    if (response.status !== 200) {
      throw new Error('Something went wrong!');
    }
    const resData = response.data;
    console.log(resData);

    const loadedProducts = [];

    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price,
        ),
      );
    }

    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter(prod => prod.ownerId === userId),
    });
  } catch (err) {
    // Send to custom server analytics;
    throw err;
  }
};

export const createProduct = (title, description, imageUrl, price) => async (
  dispatch,
  getState,
) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const token = getState().auth.token;
  const userId = getState().auth.userId;

  const formData = {
    title,
    description,
    imageUrl,
    price,
    ownerId: userId,
  };

  console.log(formData);
  const body = JSON.stringify(formData);

  // any async code you want!
  try {
    const response = await axios.post(
      `https://shopping-app-948db.firebaseio.com/products.json?auth=${token}`,

      body,
      config,
    );
    console.log(response.name);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: response.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updateProduct = (id, title, description, imageUrl) => async (
  dispatch,
  getState,
) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const token = getState().auth.token;

  const formData = {
    title,
    description,
    imageUrl,
  };

  console.log(formData);
  const body = JSON.stringify(formData);

  // any async code you want!
  try {
    await axios.patch(
      `https://shopping-app-948db.firebaseio.com/products/${id}.json?auth=${token}`,

      body,
      config,
    );

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
    // dispatch(getProducts());
  } catch (error) {
    throw new Error('Something went wrong!');
    // console.log(error.response.data);
  }
};
