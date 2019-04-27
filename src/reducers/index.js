import {combineReducers} from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
export default combineReducers({
    auth: authReducer, 
    product: productReducer, 
    cart: cartReducer, 
    order: orderReducer
})