import Axios from "axios";
import * as types from './types';
export const createCart =()=>dispatch=>{
    Axios.get('https://backendapi.turing.com/shoppingcart/generateUniqueId')
    .then(res=>{
        dispatch({
            type: types.CREATE_CART,
            payload: res.data.cart_id
        })
    })
    .catch(err=>{
        dispatch({
            type: types.CREATE_CART, 
            payload: null
        })
    })
}
export const updateItemCart =(itemid, count, cartId)=>dispatch=>{
    Axios.put(`https://backendapi.turing.com/shoppingcart/update/${itemid}`, {quantity: count})
    .then(res=>{
        dispatch({type: types.GET_CART_PRODUCTS, 
            payload: res.data
        })
        dispatch(getTotalAmount(cartId));
    })
    .catch(err=>{
        dispatch({type: types.GET_CART_PRODUCTS, 
            payload: []
        })
    })
}
export const removeProduct =(itemid, cartid)=>dispatch=>{
    Axios.delete(`https://backendapi.turing.com/shoppingcart/removeProduct/${itemid}`)
    .then(res=>{
        dispatch(getTotalAmount(cartid));
        dispatch(getItemsInCart(cartid));
    })
    .catch(err=>{
        console.log(err);
    })
}
export const addProductCart =(pro)=>dispatch=>{
    Axios.post('https://backendapi.turing.com/shoppingcart/add', pro)
    .then(res=>{
        console.log(
            "Add product cart"
        )
        dispatch({type: types.GET_CART_PRODUCTS, 
            payload: res.data
        })
        dispatch(getTotalAmount(pro.cart_id));
    })
    .catch(err=>{
        dispatch({type: types.GET_CART_PRODUCTS, 
            payload: []
        })
    })
}
export const addWishCart = (itemid, cartid)=>dispatch=>{
    Axios.get(`https://backendapi.turing.com/shoppingcart/saveForLater/${itemid}`)
    .then(res=>{
        console.log("add wish cart success", res);
        dispatch(getWishList(cartid));
        dispatch(getItemsInCart(cartid));
        dispatch(getTotalAmount(cartid));
    })
    .catch(err=>{
        console.log("add width cart errr", err);
        
    })
}
export const moveProduct =(itemid, cartid)=>dispatch=>{
    Axios.get(`https://backendapi.turing.com/shoppingcart/moveToCart/${itemid}`)
    .then(res=>{
        dispatch(getItemsInCart(cartid));
        dispatch(getTotalAmount(cartid));
        dispatch(getWishList(cartid));
    })
    .catch(err=>{

    })
}
export const getDeleteCart =(cartid)=>dispatch=>{
    Axios.delete(`https://backendapi.turing.com/shoppingcart/empty/${cartid}`)
    .then(res=>{
        dispatch(getItemsInCart(cartid));
        dispatch(getTotalAmount(cartid));
        dispatch(getWishList(cartid));
    })
    .catch(err=>{

    })
}
export const getWishListFromEmpty =(cartid)=>dispatch=>{
    const pro = {cart_id: cartid, product_id: 2, attributes: "test"};
    Axios.post('https://backendapi.turing.com/shoppingcart/add', pro)
    .then(res=>{
        console.log(
            "first axios"
        )
        let obj = res.data.filter(dat => dat.product_id === 2);
        if(obj){
            Axios.get(`https://backendapi.turing.com/shoppingcart/saveForLater/${obj.item_id}`)
                .then(res=>{
                     console.log("second axios");
                    Axios.get(`https://backendapi.turing.com/shoppingcart/moveToCart/${obj.item_id}`)
                    .then(res=>{
                        console.log("thid axios");
                        dispatch(getWishList(cartid));
                        Axios.delete(`https://backendapi.turing.com/shoppingcart/removeProduct/${obj.item_id}`)
                        .then(res=>{
                            
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                    })
                    .catch(err=>{
                
                    }) })
                .catch(err=>{
                    console.log("add width cart errr", err);
                })
        }
    })
    .catch(err=>{
        dispatch({type: types.GET_CART_PRODUCTS, 
            payload: []
        })
    })
}
export const getWishList =(cartid)=>dispatch=>{
    

    Axios.get(`https://backendapi.turing.com/shoppingcart/getSaved/${cartid}`)
    .then(res=>{
        console.log("this is  get wish list", res.data);
        dispatch({
            type: types.GET_WISH_LIST, 
            payload: res.data
        })
    })
    .catch(err=>{
        console.log("this is error get wish list", err);
        dispatch({
            type: types.GET_WISH_LIST, 
            payload: []
        })
    })
}
export const getTotalAmount  =(cartId) => dispatch=>{
    console.log("get total amount");
    if(cartId){
        console.log("cart Id total amount", cartId )
        Axios.get(`https://backendapi.turing.com/shoppingcart/totalAmount/${cartId}`)
        .then(res=>{
            if(res.data.total_amount){
            dispatch({
                type: types.SET_TOTAL, 
                payload: res.data.total_amount
            })
        }else{
            dispatch({
                type: types.SET_TOTAL, 
                payload: 0
            })
        }
        })
        .catch(err=>{
            dispatch({
                type: types.SET_TOTAL, 
                payload: 0
            })
        })
    }
    else {
        dispatch({
            type: types.SET_TOTAL, 
            payload: 0
        })
    }
}
export const getItemsInCart =(cartid)=>dispatch=>{
    Axios.get(`https://backendapi.turing.com/shoppingcart/${cartid}`)
    .then(res=>{
        dispatch({type: types.GET_CART_PRODUCTS, 
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({type: types.GET_CART_PRODUCTS, 
            payload: []
        })
    })
}
