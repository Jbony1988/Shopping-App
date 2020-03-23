import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      //   Variable to set new or updated cart item
      let updateOrNewCartItem;

      if (state.items[addedProduct.id]) {
        //    already have the item in the cart
        updateOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
      } else {
        updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: {...state.items, [addedProduct.id]: updateOrNewCartItem},
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      // store selected cart item to be remove in constant
      const selectedCartItem = state.items[action.pid];
      // store quantity from selectedCarted item in constant
      const currentQty = selectedCartItem.quantity;

      // global updatedCartitem variable
      let updatedCartItems;
      // if current quantity of item is greater than zero then reduce by one
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice,
        );
        updatedCartItems = {...state.items, [action.pid]: updatedCartItem};
        // if current item is not  less than one, then remove item from cart completely
      } else {
        // spread items from state.items object into updateCartitems
        updatedCartItems = {...state.items};
        // delete selected cartitem by id from updatedCartitems
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
  }
  return state;
};
