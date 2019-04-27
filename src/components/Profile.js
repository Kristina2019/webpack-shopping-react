import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import isEmpty from '../utils/is-empty';
import {connect} from 'react-redux';
import {getCustomer, updateAddress, updateCustomer} from '../actions/authActions';
import {getShipping, getCountryList, getOrderDetail, getCustomerOrder } from '../actions/orderActions';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
class Profile extends React.Component 
{
    state = {
        customer_id: '', 
        name: '', 
        email: '', 
        address_1: '', 
        address_2: '', 
        city: '', 
        region: '', 
        postal_code: '', 
        shipping_region_id: 1, 
        day_phone: '', 
        eve_phone: '', 
        mob_phone: '',
        country: '', 
        errors: {}, 
        detail: null
    }
    componentDidMount(){
        this.props.getCustomerOrder();
        this.props.getCustomer();
        this.props.getCountryList();
        if(this.props.auth){
            let temp = this.props.order.shippinglist.filter(sh => 
                (sh.shipping_region_id === this.props.auth.customer.shipping_region_id));
               // temp = temp[0].shipping_region;
              //  temp = temp ? temp : '';
                console.log("temp ", temp);
            this.setState({
                customer_id: this.props.auth.customer.customer_id, 
                name: this.props.auth.customer.name, 
                region: temp ? temp : '',         
                email: this.props.auth.customer.email, 
                address_1: this.props.auth.customer.address_1 ? this.props.auth.customer.address_1: '', 
                address_2: this.props.auth.customer.address_2 ? this.props.auth.customer.address_2: '', 
                city: this.props.auth.customer.city ? this.props.auth.customer.city : '', 
                postal_code: this.props.auth.customer.postal_code ? this.props.auth.customer.postal_code : '', 
                day_phone: this.props.auth.customer.day_phone? this.props.auth.customer.day_phone: '', 
                eve_phone: this.props.auth.customer.eve_phone ? this.props.auth.customer.eve_phone : '', 
                mob_phone: this.props.auth.customer.mob_phone ? this.props.auth.customer.mob_phone: '', 
                shipping_region_id: this.props.auth.customer.shipping_region_id ? this.props.auth.customer.shipping_region_id: 1
            })
        }
        
        this.props.getShipping();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.customer !== this.props.auth.customer){
            /*let temp = this.props.order.shippinglist.filter(sh => (sh.shipping_region_id === nextProps.auth.customer.shipping_region_id));
            (temp [0] ? temp = temp[0] : temp = null)
            (temp.shipping_region ? temp = temp.shipping_region : temp = null)
            console.log("temp ", temp);
            this.setState({
                customer_id: nextProps.auth.customer.customer_id, 
                name: nextProps.auth.customer.name, 
                email: nextProps.auth.customer.email, 
                region: temp ? temp: '', 
                address_1: nextProps.auth.customer.address_1 ? nextProps.auth.customer.address_1: '', 
                address_2: nextProps.auth.customer.address_2 ? nextProps.auth.customer.address_2: '', 
                city: nextProps.auth.customer.city ? nextProps.auth.customer.city : '', 
                postal_code: nextProps.auth.customer.postal_code ? nextProps.auth.customer.postal_code : '', 
                day_phone: nextProps.auth.customer.day_phone? nextProps.auth.customer.day_phone: '', 
                eve_phone: nextProps.auth.customer.eve_phone ? nextProps.auth.customer.eve_phone : '', 
                mob_phone: nextProps.auth.customer.mob_phone ? nextProps.auth.customer.mob_phone: '', 
                country: nextProps.auth.customer.country ? nextProps.auth.customer.country : '',
                shipping_region_id: nextProps.auth.customer.shipping_region_id ? nextProps.auth.customer.shipping_region_id: 1
            })
            */
           let cus = nextProps.auth.customer;
           this.setState({ customer_id: 
               cus.customer_id,
               name: cus.name ? cus.name: '',
               email: cus.email ? cus.email: '',
               region: cus.region ? cus.region: '',
               address_1: cus.address ? cus.address: '',
               address_2: cus.address_2 ? cus.address_2 : '', 
               city: cus.city ? cus.city: '', 
               postal_code: cus.postal_code ? cus.postal_code : '', 
               day_phone: cus.day_phone ? cus.day_phone: '', 
                eve_phone : cus.eve_phone ? cus.eve_phone : '', 
                mob_phone : cus.mob_phone ? cus.mob_phone : '', 
                country : cus.country ? cus.country : '', 
                shipping_region_id : cus.shipping_region_id ? cus.shipping_region_id : ''
           })
           
        }
    }
    onSubmit =(e)=>{
        e.preventDefault();
        console.log("On Submit ");
        console.log(this.state);
        let errors = {};
        if(isEmpty(this.state.name)){
            errors.name = "Name is required";
        }
        if(isEmpty(this.state.email)){
            errors.email = "Email is required";
        }
        if(isEmpty(this.state.address_1)){
            errors.address_1 = "Address 1 is required";
        }
        if(isEmpty(this.state.postal_code)){
            errors.postal_code = "Postal code is required.";
        } 
        if(isEmpty(this.state.country)){
            errors.country = "Country is required.";
        }
        if(this.state.shipping_region_id == 1){
            errors.shipping_region_id = "Please select shipping region";
        }
        if(isEmpty(this.state.city)){
            errors.city = "City is required."
        }
        this.setState({errors: errors});
        if(isEmpty(errors) && this.props.auth.isAuthenticated){
            const tt = {
                address_1: this.state.address_1, 
                address_2: this.state.address_2, 
                city: this.state.city, 
                region: this.state.region, 
                postal_code: this.state.postal_code, 
                country: this.state.country, 
                shipping_region_id: parseInt(this.state.shipping_region_id)
            }
            const cus = {
                name: this.state.name, 
                email: this.state.email, 
                day_phone: this.state.day_phone, 
                eve_phone: this.state.eve_phone, 
                mob_phone: this.state.mob_phone
            }
            this.props.updateAddress(tt, cus);
            
            //this.props.updateCustomer(cus);
        }


        
    }
    selectChange =(e)=>{
        this.setState({shipping_region_id: e.target.value});
        let temp = this.props.order.shippinglist.filter(sh => (sh.shipping_region_id.toString() === e.target.value))[0].shipping_region;
        this.setState({region: temp});
    }
   
    selectCountryChange =(e)=>{
        this.setState({country: e.target.value});
    }
    onRowClick =(ord)=>{
        this.props.getOrderDetail(ord);
    }
    continuePayment =(ord)=>{
        
    }
    render(){
        console.log(this.props.order.orders)
        let shipping = null;
        if(this.props.order.shippinglist){
            shipping = this.props.order.shippinglist.map(sh =>{
                return(<option key = {sh.shipping_region_id} value = {sh.shipping_region_id}>{sh.shipping_region}</option>)
            })
        }
        let country = null;
        if(this.props.order.countrylist){
            country = this.props.order.countrylist.map(sh =>{
                return(<option key = {sh.name} value = {sh.name}>{sh.name}</option>)
            })
        }
        let detaildiv = null;
        if(this.props.order.orderdetail){
            detaildiv =  (
            <div className = "modal">
            <div className = "modal__container">
                <div className="modal__close" onClick = {()=>this.props.getOrderDetail(null)}>Close</div>
                <h3 className="title"> Order Detail</h3>
                <div className = "ordertable">
                        <div className="ordertable__row ordertable__header">
                            <div className="ordertable__date">Product Name</div>
                            <div className="ordertable__total">Attributes</div>
                            <div className="ordertable__shipped">Quantity</div>
                            <div className="ordertable__status">Unit Cost</div>
                            <div className="ordertable__detail">Sub total</div>
                        </div>
                       {this.props.order.orderdetail.map(od =>(
                        <div className="ordertable__row" key = {od.order_id + od.product_id + od.attributes}>
                            <div className="ordertable__date">{od.product_name}</div>
                            <div className="ordertable__total">{od.attributes}</div>
                            <div className="ordertable__shipped">{od.quantity}</div>
                            <div className="ordertable__status">{od.unit_cost}</div>
                            <div className="ordertable__detail">{od.subtotal}</div>
                        </div>
                       ))}
                        {ordertable}
                    </div>
            </div>
            </div>
            ); 
        }
        
        let ordertable = null;
        if(this.props.order.orders){
            ordertable =this.props.order.orders.map(ord =>( 
                    
                    <div className="ordertable__row" key = {ord.order_id} onClick = {()=>this.onRowClick(ord.order_id)}>
                    {console.log("date ",ord.created_on)}
                        <div className="ordertable__date"><Moment format="YYYY-MM-DD hh:mm:ss">{ord.created_on}</Moment></div>
                        <div className="ordertable__total">{ord.total_amount}</div>
                        <div className="ordertable__shipped">{ord.shipped_on ? "shipped": 'no'}</div>
                        <div className="ordertable__status">{ord.status === 2 ? "paid" : "not paid"}</div>
            <div className="ordertable__detail">{ord.status === 2 ? null: <Button variant = "contained" onClick = {()=>this.continuePayment(ord)} color = "primary">Do Payment</Button>}</div>
                    
                    </div>
                    ));
        }
        return(
            
            <div className = "container">
                <div className = "profile">
                <h3 className="title">User Profile </h3>
                <form action="" onSubmit = {(e)=>this.onSubmit(e)} >
                <TextField
                    required
                    error = {!isEmpty(this.state.errors.name)}
                    id="profileName"
                    label="Name"
                    value = {this.state.name}
                    //onChange = {(e)=> this.setState({name: e.target.value})}
                    margin="dense"
                    variant="outlined"
                    helperText = {this.state.errors.name}
                    />
                <TextField
                    error = {!isEmpty(this.state.errors.email)}
                    id="profileEmail"
                    label="Email"
                    value={this.state.email}
                    margin="dense"
                    variant="outlined"
                    onChange = {(e)=> this.setState({email: e.target.value})}
                    helperText = {this.state.errors.email}
                    />
                <TextField
                error = {!isEmpty(this.state.errors.address_1)}
                id="profileAddress1"
                label="Address 1"
                value={this.state.address_1}
                margin="dense"
                onChange ={(e)=> this.setState({address_1: e.target.value})}
                variant="outlined"
                helperText = {this.state.errors.address_1}
                />
                <TextField
                    error = {!isEmpty(this.state.errors.address_2)}
                    id="profileAddress2"
                    label="Address 2"
                    value={this.state.address_2}
                    margin="dense"
                    variant="outlined"
                    
                    onChange = {(e) =>this.setState({address_2: e.target.value})}
                    />
                <TextField
                    error = {!isEmpty(this.state.errors.city)}
                    id="profileCity"
                    label="City"
                    value={this.state.city}
                    margin="dense"
                    variant="outlined"
                    helperText = {this.state.errors.city}
                    onChange ={(e)=> this.setState({city: e.target.value})}
                    />
                    <TextField
                    error = {!isEmpty(this.state.errors.postal_code)}
                    id="profilePostalcode"
                    label="Postal code"
                    helperText = {this.state.errors.postal_code}
                    onChange = {(e)=> this.setState({postal_code: e.target.value})}
                    value={this.state.postal_code}
                    margin="dense"
                    variant="outlined"
                    />
                <TextField
                    error = {!isEmpty(this.state.errors.eve_phone)}
                    id="profileEvephone"
                    label="Eve Phone"
                    value={this.state.eve_phone}
                    margin="dense"
                    variant="outlined"
                    onChange = {(e)=> this.setState({eve_phone: e.target.value})}
                    />
                <TextField
                error = {!isEmpty(this.state.errors.mob_phone)}
                id="profileMobphone"
                label="Mobile Phone"
                value={this.state.mob_phone}
                margin="dense"
                variant="outlined"
                onChange = {(e)=>this.setState({mob_phone: e.target.value})}
                />
                <TextField
                    error = {!isEmpty(this.state.errors.day_phone)}
                    id="profileDayphone"
                    label="Day Phone"
                    onChange = {(e)=> this.setState({day_phone: e.target.value})}
                    value={this.state.day_phone}
                    margin="dense"
                    variant="outlined"
                    />

                <div className="select">
                    <p className="select__p">Shipping Region </p>
                    <select name="shippingregion" value = {this.state.shipping_region_id}
                     onChange = {(e)=> this.selectChange(e)}
                      >

                        {shipping}
                    </select>
                    <p className="select__error">&nbsp;{this.state.errors.shipping_region_id}</p>
                </div>
                <div className="select">
                    <p className="select__p">Country </p>
                    <select name="shippingregion" value = {this.state.country}
                     onChange = {(e)=> this.selectCountryChange(e)}
                      id="">
                        <option value="">Please select your country</option>
                        {country}
                    </select>
                    <p className="select__error">&nbsp;{this.state.errors.country}</p>
                </div>
                <Button color = "primary" variant = "contained" type = "submit">Update Profile</Button>
                
                </form>
                <div className="myorder">
                    <h3 className="title">Order List</h3>    
                    <div className = "ordertable">
                        <div className="ordertable__row ordertable__header">
                            <div className="ordertable__date"> Order Date</div>
                            <div className="ordertable__total"> Total Amount</div>
                            <div className="ordertable__shipped">Shipped </div>
                            <div className="ordertable__status">Status</div>
                            <div className="ordertable__detail"></div>
                        </div>
                        {detaildiv}
                        {ordertable}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    auth: state.auth,
    order: state.order, 

})
export default connect(mapStateToProps, {getShipping, getOrderDetail, updateAddress, getCountryList, updateCustomer,getCustomerOrder, getCustomer})(Profile);