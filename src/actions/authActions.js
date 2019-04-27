import * as types from './types';
import Axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
export const register=(reg)=>dispatch=>{
    Axios.post('https://backendapi.turing.com/customers',reg )
    .then(res=>{
        console.log("res ", res);
        dispatch(setCustomer(res.data.customer));
        let token = res.data.accessToken;
        setAuthToken(token);
        

        const user = jwt_decode(token);
        console.log("user token ", user); 
        localStorage.setItem('jwtToken', token);
        dispatch(setUser(user));
        
    })
    .catch(err=>{
        console.log("err, ", err);
        dispatch({
            type: types.SET_AUTH_ERROR, 
            payload: err.response.data.error
        })
    });
}
export const login =(log)=>dispatch=>{
    Axios.post('https://backendapi.turing.com/customers/login', log)
    .then(res=>{
        console.log("res ", res);
        dispatch(setCustomer(res.data.user));
        let token = res.data.accessToken;
        setAuthToken(token);
        

        const user = jwt_decode(token);
        console.log("user token ", user); 
        localStorage.setItem('jwtToken', token);
        dispatch(setUser(user));
        
    })
    .catch(err=>{
        dispatch({
            type: types.SET_AUTH_ERROR, 
            payload: err.response.data.error
        })
    })
}
export const setUser =(user)=>{
    return {
        type: types.SET_USER, 
        payload: user
    }
}
export const setCustomer =(customer)=>{
    return {
        type: types.SET_CUSTOMER, 
        payload: customer
    }
}
export const getCustomer =()=>dispatch=>{
    console.log("get Customer")
    Axios.get('https://backendapi.turing.com/customer')
    .then(res=>{
        console.log(" get customer ", res);
        dispatch(setCustomer(res.data));
    })
    .catch(err=>{
        console.log(" this is err ", err);
        dispatch({
            type: types.TOKEN_EXPIRED, 
            
        })
    })
}
export const updateAddress =(address, customer)=>dispatch=>{
    Axios.put('https://backendapi.turing.com/customers/address', address, {headers: {'user-key': localStorage.jwtToken}})
    .then(res=>{
        Axios.put('https://backendapi.turing.com/customer', customer, {headers: {'user-key': localStorage.jwtToken}})
        .then(resp=>{
            dispatch(
                {
                    type: types.SET_CUSTOMER, 
                    payload: resp.data
                }
            )
        })
        .catch(err=>{
            console.log("update customer err", err);
        })
    })
    .catch(err=>{
        console.log("err udpate address", err.response);
    });
}
export const updateCustomer =(customer)=>dispatch=>{
    Axios.put('https://backendapi.turing.com/customer', customer, {headers: {'user-key': localStorage.jwtToken}})
    .then(res=>{
        dispatch(
            {
                type: types.SET_CUSTOMER, 
                payload: res.data
            }
        )
    })
    .catch(err=>{
        console.log("update customer err", err);
    })
}

export const logoutUser =()=>dispatch=>{
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCustomer({}));
    dispatch(setUser({}));
    dispatch({
        type: types.CREATE_CART, 
        payload: null,
    })
    dispatch({
        type: types.GET_CART_PRODUCTS, 
        payload: []
    })
    dispatch({
        type: types.SET_ORDER, 
        payload: null
    })
    dispatch({
        type: types.GET_WISH_LIST,
        payload: []
    });
}
