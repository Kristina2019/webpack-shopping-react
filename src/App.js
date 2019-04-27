import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Products from './components/Products';
import {withRouter, Redirect, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import {connect} from 'react-redux';
import Register from './components/Register';
import ProductDetail from './components/ProductDetail';
import Bag from'./components/Bag';
import Wish from './components/Wish';
import Order from './components/Order';
import Payment from './components/Payment';
import Profile from './components/Profile';
class App extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        let temp=null;
        //console.log(this.props);
        let route;
        if(this.props.auth.isAuthenticated){
            route = (
                <Switch>
                    <Route path = "/bag" component ={Bag} />
                    <Route path = "/wish" component ={Wish} />
                    <Route path = "/payment" component = {Payment} />
                    <Route path = "/" exact component = {Products}/>;
                    <Route path = "/profile" component = {Profile}/>;
                    <Route path = "/order" component = {Order} />
                    <Route path = "/myorder"  component = {Products}/>;
                    <Route path = "/detail" component = {ProductDetail}/>
                    
                </Switch>
            );
        }else{
            route = (
                <Switch>
                    <Route path = "/" exact component = {Products}/>;
                    <Route  path = "/detail" component = {ProductDetail}/>
                    <Redirect to = "/"/>
                </Switch>
            );
        }


        if(this.props.location.pathname === '/login'){
            console.log("login  ")
            
        if(!this.props.auth.isAuthenticated){
                temp = <Route path = "/login" exact component = {Login}/>;
            }else{
                temp = <Redirect  to = "/" />
            }
        }else if(this.props.location.pathname === '/register'){
            
            if(!this.props.auth.isAuthenticated){
                temp = <Route path = "/register" exact component = {Register}/>;
            }
            else{
                temp = <Redirect  to = "/" />
            }
        }
        
        else{
            temp = (
            <div className = "base">
                <Navbar />
                {route}
                
                <div className = "footer">Footer</div>
            </div>
            )
        }
        return temp;
    }
}

App.propTypes = {

};

const mapStateToProps = state=>({
    auth: state.auth
})
export default connect(mapStateToProps)(withRouter(App));