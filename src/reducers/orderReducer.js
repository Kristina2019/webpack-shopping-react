import * as types from '../actions/types';
import isEmpty from '../utils/is-empty';
const initialState = {
    orderId: null, 
    countrylist: [], 
    taxlist: [], 
    shippinglist: [],
    shippingregionlist: [], 
    amount: 0,              
    orders: [], 
    orderdetail: []
    
};

const authReducer =(state=initialState, action)=>{
    switch(action.type){
        case types.GET_ORDER_DETAIL: 
        return{
            ...state, 
            orderdetail: action.payload
        }
        case types.SET_ORDERS: 
        return {
            ...state, 
            orders: action.payload
        }
        case types.GET_COUNTRY_LIST: 
        return{
            ...state, 
            countrylist: action.payload
        }
        case types.GET_TAX_LIST: 
        return{
            ...state, 
            taxlist: action.payload
        }
        case types.GET_SHIPPING_LIST: 
        return{
            ...state, 
            shippinglist: action.payload
        }
        case types.GET_SHIPPING_REGION_LIST:
        return{
            ...state,
            shippingregionlist: action.payload
        }
        case types.SET_AMOUNT:
        return{
            ...state, 
            amount: action.payload
        }
        case types.SET_ORDER: 
        return{
            ...state, 
            orderId: action.payload
        }
        default: 
            return state;
    }
}
export default authReducer;