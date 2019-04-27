import React from 'react';
import {injectStripe, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {stripeCharge} from '../actions/orderActions';
class CheckoutForm extends React.Component{
    state = {
        message: '', 
        name: ''
    }
    componentDidMount(){

    }
    onSubmit=(e)=>{
        e.preventDefault();
        if(this.state.name === ''){
            this.setState({message: 'Name is required'});
            return;
        }
        this.props.stripe.createToken({name: this.state.name}).then((res) => {
            if(res.error){
                this.setState({message: res.error.message})
            }else if(res.token){
                if(localStorage.jwtToken){
                    let obj  = {
                        stripeToken: res.token.card.id, 
                        order_id: this.props.order.orderId, 
                        description: "Order product", 
                        amount: 999, //Math.ceil(parseFloat(this.props.order.amount.toString())*100), 
                        currency: 'usd'
                    }
                    this.props.stripeCharge(obj);
                }else{
                    this.state.message = "User authentication failed.";
                    setTimeout(()=>{
                        this.props.history.push('/');
                    }, 1000);
                    
                }
                //console.log(localStorage.jwtToken);
            }
            //console.log('Received Stripe token:', res);
          })
          
    }
    render(){
        return(
            <div className = "checkout">
                <form className = "checkout__form" onSubmit = {(e)=> this.onSubmit(e)}>
                    <h3 className="title">Check out</h3>
                    <p className="checkout__p">Name on Card</p>
                    <input type="text"  value = {this.name} onChange = {(e) => this.setState({name:e.target.value})} className = "checkout__input"/>
                    <CardElement />
                    {/*
                    <p className="checkout__p">Card Number </p>
                    <CardNumberElement />
                    <p className="checkout__p">Card Expiry</p>
                    <CardExpiryElement />
                    <p className="checkout__p">Card CVC</p>
                    <CardCVCElement />
                    */}
                    <p className="checkout__p">Total Amount: $ {parseFloat(this.props.order.amount.toString()).toFixed(2)} </p>
                    <p className="error">&nbsp; {this.state.message}</p>
                    <Button variant = "contained" type = "submit" style = {{marginTop: '20px'}} color = "primary">Checkout</Button>
                </form>
            </div>

        );
    }
}
const mapStateToProps =(state)=>({
auth: state.auth, 
order: state.order, 
})
export default connect(mapStateToProps, {stripeCharge})(injectStripe( withRouter(CheckoutForm)));