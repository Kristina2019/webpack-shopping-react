import axios from 'axios';
import * as types from './types';
export const getProducts = (start, search)=>dispatch=>{
    //type = 1 search 
    //type = 2 just pagination
    //type = 3 cat dep
    //https://backendapi.turing.com/products?page=2&limit=20&description_length=100
    dispatch({
        type: types.SET_START, 
        payload: start
    });
    
    dispatch({
        type: types.SET_SEARCH, 
        payload: search
    });
    if(search!== ''){
        axios.get(`https://backendapi.turing.com/products/search?query_string=${search}&page=${start}&limit=20&description_length=100`)
        .then(res=>{
            dispatch({
                type: types.GET_COUNT, 
                payload: res.data.count
            })
            dispatch({
                type: types.GET_PRODUCTS, 
                payload: res.data.rows
            });
        })
        .catch(err=>{
            dispatch({
                type: types.GET_PRODUCTS, 
                payload: []
            });
        });
    }else{
        axios.get(`https://backendapi.turing.com/products?page=${start}&limit=20&description_length=100`)
        .then(res =>{
            dispatch({
                type: types.GET_COUNT, 
                payload: res.data.count
            })
            dispatch({
                type: types.GET_PRODUCTS, 
                payload: res.data.rows
            });
        })
        .catch(err=>{
            dispatch({
                type: types.GET_PRODUCTS, 
                payload: []
            });
        });
    }
        
    

    
}
export const setProductId =(id)=>dispatch=>{
    dispatch({
        type: types.SET_PRODUCT_ID, 
        payload: id
    })
}
export const getProductById =(id)=>dispatch=>{
    axios.get(`https://backendapi.turing.com/products/${id}`)
    .then(res=>{
        dispatch({
            type: types.GET_PRODUCT_BY_ID, 
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type: types.GET_PRODUCT_BY_ID, 
            payload: null
        })
    })
}
export const getAttributeByProductId =(id)=>dispatch=>{
    axios.get(`https://backendapi.turing.com/attributes/inProduct/${id}`)
    .then(res=>{
        let attr = res.data;
        const sizelist = [];
        const colorlist = [];
        attr.forEach(at =>{
            if(at.attribute_name === "Color")
            {
                colorlist.push(at);
            }else if(at.attribute_name === "Size"){
                sizelist.push(at);
            }
        });
        dispatch({type: types.GET_COLOR, 
            payload: colorlist
        });
        dispatch({type: types.GET_SIZE, 
            payload: sizelist
        })
    })
    .catch(err=>{
        dispatch({type: types.GET_COLOR, 
            payload: []
        });
        dispatch({type: types.GET_SIZE, 
            payload: []
        })
    })
}
export const setSizeSelected =(size) =>dispatch=>{
    dispatch({
        type: types.SET_SIZE, 
        payload: size
    })
}
export const setColorSelected =(color) =>dispatch=>{
    dispatch({
        type: types.SET_COLOR, 
        payload: color
    })
}