import * as types from '../actions/types';
import isEmpty from '../utils/is-empty';
const initialState = {
    cartId: null, 
    wishlist: [],
    products: [], 
    total: 0, 
};

const authReducer =(state=initialState, action)=>{
    switch(action.type){
        case types.CREATE_CART: 
        return{
            ...state, 
            cartId:action.payload
        }
        case types.GET_CART_PRODUCTS: 
            return{
                ...state , 
                products: action.payload
            }
        case types.SET_TOTAL:
        return{
            ...state, 
            total: action.payload
        }
        case types.GET_WISH_LIST: 
        return{
            ...state, 
            wishlist: action.payload
        }
        default: 
            return state;
    }
}
export default authReducer;