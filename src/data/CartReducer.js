import { ActionTypes } from './Types';
import { NetworkStatus } from 'apollo-boost';

export const CartReducer = (storeData, action) => {
  console.log('storeData: ', action, storeData)
  let newStore = { cart: [], cartItems: 0, cartPrice: 0, ...storeData };
  console.log('newStore: ', newStore)

  switch(action.type) {
    case ActionTypes.CART_ADD:
      const p = action.payload.product;
      const q = action.payload.quantity;

      let existing = newStore.cart.find(item => item.product.id === p.id);
      if (existing) {
        existing.quantity += q;
      }
      else {
        newStore.cart = [...newStore.cart, action.payload];
      }
      newStore.cartItems += q;
      newStore.cartPrice += p.price * q;
      return newStore;

    case ActionTypes.CART_UPDATE:
      newStore.cart = newStore.cart.map(item => {
        if (item.product.id === action.payload.product.id) {
          const diff = action.payload.quantity - item.quantity;
          newStore.cartItems += diff;
          newStore.cartPrice += (item.product.price * diff);
          return action.payload;
        }
        else {
          return item;
        }
      });
      return newStore;
    case ActionTypes.CART_REMOVE:
      let selection = newStore.cart.find(item => item.product.id === action.payload.id);
      //if (selection)
      newStore.cartItems -= selection.quantity;
      newStore.cartPrice -= selection.quantity * selection.product.price;
      newStore.cart = newStore.cart.filter(item => item !== selection);
      return newStore;

    case ActionTypes.CART_CLEAR:
      return { ...storeData, cart: [], cartItems: 0, cartPrice: 0 }

    default:
      return storeData || {};
      //throw Error(`Unknown action type: ${action.type}`);
  }
}