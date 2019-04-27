import React from 'react';

import {Elements, StripeProvider} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';
class Payment extends React.Component{
    render(){
        return(
            <StripeProvider apiKey = "pk_test_NcwpaplBCuTL6I0THD44heRe">
            <Elements>
                <InjectedCheckoutForm />
            </Elements>
            </StripeProvider>
        );
    }
}
export default Payment;
