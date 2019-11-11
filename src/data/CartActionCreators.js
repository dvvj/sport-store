import {ActionTypes} from './Types';

export const addToCart = (product, quantity) => ({
  type: ActionTypes.CART_ADD,
  payload: {
    product,
    quantity: quantity || 1
  }
});