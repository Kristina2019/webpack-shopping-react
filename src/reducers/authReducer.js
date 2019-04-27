import * as types from '../actions/types';
import isEmpty from '../utils/is-empty';
const initialState = {
    isAuthenticated: false, 
    tokenUser: {}, 
    customer: {},
    error: {}
};

const authReducer =(state=initialState, action)=>{
    switch(action.type){
        case types.SET_USER: 
            return{
                ...state, 
                tokenUser: action.payload, 
                isAuthenticated: !isEmpty(action.payload), 
                error: {}
            }
        case types.SET_CUSTOMER: {
            console.log(" set customer ", action.payload)
            return{
                ...state, 
                customer: action.payload, 
                error: {}
            }
        }
        case types.SET_AUTH_ERROR: 
            return{
                ...state, 
                error: action.payload, 
                isAuthenticated: false
            }
        case types.TOKEN_EXPIRED: 
            return{
                ...state, 
                isAuthenticated: false, 
                tokenUser: {}, 
                customer: {}, 
                error: {}
            }
        default: 
            return state;
    }
}
export default authReducer;