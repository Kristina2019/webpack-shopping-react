import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/CardGiftcard';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getProducts} from '../actions/productActions';
import {logoutUser} from '../actions/authActions'; 
import {getTotalAmount} from '../actions/cartActions';
class Navbar extends Component {
    state = {
        search: ''
    }
    componentDidMount(){
        this.props.getTotalAmount(this.props.cart.cartId);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.product.search){
            this.setState({search: nextProps.product.search});
        }
        
    }
    searchChanged=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    searchSubmit=(e)=>{
        e.preventDefault();
        this.props.getProducts(this.props.product.start, this.state.search);
        console.log("search submit ", this.state.search);
    }
    logout =()=>{
        console.log("this is logout")
        this.props.logoutUser();
        this.props.history.push('/');
    }
    onBagClick =()=>{
        this.props.history.push('/bag');
    }
    render() {
        let other;
        if(this.props.auth.isAuthenticated){
            other = (<div className="navbar__other">
            <p>Total: ${parseFloat(this.props.cart.total).toFixed(2)}</p>
            
            <IconButton color="inherit" onClick = {()=>this.onBagClick()}>
                <Badge badgeContent={this.props.cart.products.length} color="primary">
                <MailIcon color = "secondary" />
                </Badge>
            </IconButton>
            
            <div className = "user">
            <IconButton color="inherit">
                <AccountCircle color = "secondary" />
            </IconButton>
                <ul className = "userlist">
                    <li className = "userlist__item"><Link to = "/profile">Profile</Link></li>
                    <li className = "userlist__item"><Link to = "/wish">Wish List</Link></li>
                    <li className = "userlist__item"><Link to = "/order">Order</Link></li>
                    <li className = "userlist__item" onClick = {()=>this.logout()}>Sign Out</li>
                </ul>
            </div>
        </div>);
        }else{
            other = (
        <div className="navbar__other">
            
            <Link className = "authlink" to = "/register">
                Register
            </Link>
            <p> or </p>
            <Link  className = "authlink" to = "/login">
                Login
            </Link>
        </div>
        )
        }
        return (
            <div className = "navbar">
                <h3 className="navbar__logo">SHOPMATE</h3>
                <div className="navbar__search">
                    <form  onSubmit = {this.searchSubmit} className = "search__form">
                        <input type="text" value = {this.state.search} placeholder  = "Search..." onChange = {(e) => this.searchChanged(e)} name = "search"/>
                        <button color="primary">
                            <SearchIcon color = "secondary" />
                        </button>
                    </form>
                </div>  
                {other}
            </div>
        );
    }
}   
const mapStateToProps =state =>({
    product: state.product, 
    auth: state.auth, 
    cart: state.cart
})
export default connect(mapStateToProps, {getProducts, getTotalAmount, logoutUser})(withRouter(Navbar));