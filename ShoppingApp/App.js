/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {enableScreens} from 'react-native-screens';

import {StatusBar} from 'react-native';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import NavigationContainer from './navigation/NavigationContainer';
import Colors from './constants/Colors';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={Colors.primary}
        translucent={true}
      />
      <NavigationContainer />
    </Provider>
  );
};

export default App;
