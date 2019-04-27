import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import {getCountryList, getShipping, getTaxList, getShippingRegion, createOrder} from '../actions/orderActions';
import {connect} from 'react-redux';
import image from '../assets/shopping.jpg';
import isEmpty from '../utils/is-empty';
class Order extends Component {
    state = {
        country: '0', 
        city: '', 
        tax: '',
        shippingregion: '', 
        address1: '', 
        address2: '', 
        postalcode: '',
        shippingtype: '', 
        errors: {}
    }

    componentDidMount() {
        this.props.getCountryList();
        this.props.getTaxList();
        this.props.getShipping();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.order.orderId!==null){
            this.props.history.push('/payment');
        }
    }
    handleChange =()=>{

    }
    onSubmit =(e)=>{
        e.preventDefault();
        console.log("this is stae, on submit", this.state)
        let errors = {};
        let values = {};
        let amount = 0;
        amount += parseFloat(this.props.cart.total);
        console.log("amount", amount);
        if(this.state.address1 === '')
        {
            errors.address1 = "Please enter address 1";
        }else{
            values.address1 = this.state.address1;
            values.address2 = this.state.address2;
        }
        if(this.state.country === '0' || this.state.country === ''){
            errors.country = 'Please select your country';
        }
        else{
            values.country = this.state.country;
        }
        if(this.state.tax === '0'|| this.state.tax === ''){
            errors.tax = 'Please select tax type!'
        }else{
            values.tax = this.state.tax;
            console.log(this.state.tax);
            let t = this.props.order.taxlist.filter(tax =>( tax.tax_id  == this.state.tax))[0].tax_percentage;
            console.log("  t   s t  ", t)
            t = parseFloat(t);
            t = t* amount * 0.01;
            amount += t;
            console.log(" tax amount",t , amount);

        }
        if(this.state.city === '' || this.state.city === '0'){
            errors.city = "Please insert your city";
        }else{
            values.city = this.state.city;
        }
        if(this.state.postalcode === ''){
            errors.postalcode = "Please insert your postal code!";
        }else{
            values.postalcode = this.state.postalcode;
        }
        if(this.state.shippingregion === ''|| this.state.shippingregion === '1' || this.state.shippingregion === 1){
            errors.shippingregion = 'Please select shipping region';
        }else{
            values.region = this.props.order.shippinglist.filter(sh => sh.shipping_region_id === this.state.shippingregion).shipping_region;
        }
        if(this.state.shippingtype === '0' || isEmpty(this.state.shippingtype)){
            errors.shippingtype = "please select shipping type!";
        }else{
            values.shipping_id = this.state.shippingtype;
            let sh = this.props.order.shippingregionlist.filter(sh => (sh.shipping_id == this.state.shippingtype))[0].shipping_cost;
            console.log("ship ", sh);
            amount += parseFloat(sh);
        }
        this.setState({errors: errors});
        if(isEmpty(errors) && this.props.auth.isAuthenticated){
            console.log("OK");
            console.log(" amount ", amount);
            this.props.createOrder({cart_id: this.props.cart.cartId, shipping_id: this.state.shippingtype, tax_id: this.state.tax}, amount);

        }else{
            console.log("errors", errors);
        }
    }
    shippingRegionSelected =(e)=>{
        console.log("e ", e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
       // console.log(e.target.value.shipping_region);
        this.props.getShippingRegion(parseInt(e.target.value));
    }

    render() {
        let countrylist =null;
        if(this.props.order.countrylist.length !== 0){
            countrylist = this.props.order.countrylist.map(cl =>(
                <option  key = {cl.name} value = {cl.name}>{cl.name}</option>
            ));
        let taxlist =null;
        if(this.props.order.taxlist.length !== 0){
            taxlist = this.props.order.taxlist.map(cl =>(
                <option  key = {cl.tax_id} value = {cl.tax_id}>{cl.tax_type}</option>
            ));
        }
        let shipping = null;
        if(this.props.order.shippinglist.length !== 0){
            shipping = this.props.order.shippinglist.map(sh => (
                <option key = {sh.shipping_region_id} value = {sh.shipping_region_id}> {sh.shipping_region}</option>
            ));
        }
        let shippingregions = null;
        if(!isEmpty(this.props.order.shippingregionlist)){
            shippingregions = this.props.order.shippingregionlist.map(sh => (
                <option key = {sh.shipping_id} value = {sh.shipping_id}> {sh.shipping_type}</option>
            ));
        }
        return (
            <div className = "order">
               {/* <div className="order__image">
                    <img  src = {image}/>
                </div>
        */}
                <form onSubmit ={(e)=>this.onSubmit(e)} className="order__form">
                
                <TextField  error = {!isEmpty(this.state.errors.address1)}
                    id="address1Id"
                    label="Address 1"
                    required
                    name = "address1"
                    onChange = {(e)=>this.setState({address1: e.target.value})}
                    margin="dense"
                    variant="outlined"
                    />
                <TextField
                    error = {!isEmpty(this.state.errors.address2)}
                    id="address2Id"
                    label="Address 2"
                    onChange = {(e)=>this.setState({address2: e.target.value})}
                    margin="dense"
                    variant="outlined"
                    name = "address2"
                    />
                <TextField  error = {!isEmpty(this.state.errors.postalcode)}
                    id="postalcodeId"
                    label="Postal Code "
                    required
                    onChange = {(e)=>this.setState({postalcode: e.target.value})}
                    margin="dense"
                    variant="outlined"
                    name = "postalcode"
                    />
                <TextField  error = {!isEmpty(this.state.errors.city)}
                    id="cityId"
                    label="City"
                    required
                    onChange = {(e)=>this.setState({city: e.target.value})}
                    margin="dense"
                    variant="outlined"
                    name = "postalcode"
                    />
                    
                        <div className="order__select">
                            <p className="order__p">Country: </p>
                            <select name = "country" onChange = {(e)=>this.setState({country: e.target.value})}>
                                <option value="0">Please select your country!</option>
                                {countrylist}
                            </select>
                            <p className="error__message">&nbsp; {this.state.errors.country}</p>
                        </div>
                        <div className="order__select">
                            <p className="order__p">Tax: </p>
                            <select name = "tax" onChange = {(e)=>this.setState({tax: e.target.value})}>
                                <option value="0">Please select tax type</option>
                                {taxlist}
                            </select>
                            <p className="error__message">&nbsp; {this.state.errors.tax}</p>
                        </div>
                    
                        <div  className="order__select">
                            <p className="order__p">Shipping Region: </p>
                            <select name  = "shippingregion" onChange = {(e)=>this.shippingRegionSelected(e)}>
                                
                                {shipping}
                            </select>
                            <p className="error__message">&nbsp; {this.state.errors.shippingregion}</p>
                        </div>
                        <div className="order__select">
                        <p className="order__p">Shipping Type: </p>
                            <select name = "shippingtype" onChange = {(e)=> this.setState({shippingtype: e.target.value})} >
                                <option value="0">Please select shipping type</option>
                                {shippingregions}
                            </select>
                            <p className="error__message">&nbsp; {this.state.errors.shippingtype}</p>
                        </div>
                        
                    
                    <Button variant = "contained" color = "primary" type = "submit">Submit</Button>
                
                </form>

            </div>
        );
    }
}}


const mapStateToProps = state =>{
    return{
    order: state.order, 
    cart: state.cart, 
    auth: state.auth
    }
}

export default  connect(mapStateToProps, {getCountryList, getShipping, getShippingRegion, getTaxList, createOrder})(Order);