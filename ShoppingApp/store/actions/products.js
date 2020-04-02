export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
import Product from '../../models/product';

import axios from 'axios';

export const deleteProduct = productId => {
  return {type: DELETE_PRODUCT, pid: productId};
};

export const getProducts = () => async dispatch => {
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
          'u1',
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
    });
  } catch (err) {
    // Send to custom server analytics;
    throw err;
  }
};

// export const getProducts = () => {
//   return async dispatch => {
//     // any async code you want!
//     try {
//       const response = await fetch(
//         'https://shopping-app-948db.firebaseio.com/products.json',
//       );

//       if (!response.ok) {
//         throw new Error('Something went wrong!');
//       }

//       const resData = await response.json();
//       const loadedProducts = [];

//       for (const key in resData) {
//         loadedProducts.push(
//           new Product(
//             key,
//             'u1',
//             resData[key].title,
//             resData[key].imageUrl,
//             resData[key].description,
//             resData[key].price,
//           ),
//         );
//       }

//       dispatch({type: SET_PRODUCTS, products: loadedProducts});
//     } catch (err) {
//       // send to custom analytics server
//       throw err;
//     }
//   };
// };

export const createProduct = (
  title,
  description,
  imageUrl,
  price,
) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const formData = {
    title,
    description,
    imageUrl,
    price,
  };

  console.log(formData);
  const body = JSON.stringify(formData);

  // any async code you want!
  try {
    const response = await axios.post(
      'https://shopping-app-948db.firebaseio.com/products.json',

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
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
