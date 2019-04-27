import * as types from '../actions/types';

const initialState = {
    products: [], 
    count: 0, 
    start: 1, 
    search: '', 
    selectedId: 0, 
    product: null, 
    color: [], 
    size: [], 
    setColor: null, 
    setSize: null
};

const productReducer =(state=initialState, action)=>{
    //console.log("action ", action)
    switch(action.type){
        case types.GET_COLOR: 
            return{
                ...state, 
                color: action.payload
            }
        case types.SET_COLOR: 
            return{
                ...state, 
                setColor: action.payload
            }
        case types.SET_SIZE: 
        return {
            ...state, 
            setSize: action.payload
        }
        case types.GET_SIZE: 
            return{
                ...state, 
                size: action.payload
            }
        case types.GET_PRODUCTS: 
            return{
                ...state, 
                products: action.payload
            }
        case types.GET_COUNT: 
            return{
                ...state, 
                count: action.payload
            }
        case types.SET_START: 
            return{
                ...state, 
                start: action.payload
            }
        case types.SET_SEARCH: 
            return{
                ...state, 
                search: action.payload
            }
        case types.SET_PRODUCT_ID: 
            return{
                ...state, 
                selectedId: action.payload
            }
        case types.GET_PRODUCT_BY_ID: 
        return{
            ...state, 
            product: action.payload
        }

        default: 
            return state;
    }
}
export default productReducer;