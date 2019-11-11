import { createStore } from 'redux';
import { ShopReducer } from './ShopReducer';

export const SportsStoreDS = createStore(ShopReducer);