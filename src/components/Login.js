import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions/authActions';
import isEmpty from '../utils/is-empty';
class Login extends Component {
    state = {
        email: {
            value: '',
            touched: false
        }, 
        password: {
            value: '',
            touched: false
        }, 
        
        errors: {}
    }
    componentDidMount(){
        this.setState({email: {
            value: '',
            touched: false
        }, 
        password: {
            value: '',
            touched: false
        }, 
        errors: {}
    });
    }
    componentWillReceiveProps(nextProps){
        console.log("next prop", nextProps);
        if(nextProps.auth){
            this.setState({errors: nextProps.auth.error});
            if(isEmpty(nextProps.auth.error)){
                
                //this.setState({})
            }
        }
    }
    onChange =(e)=>{
        let val = {
                value: e.target.value, 
                touched: true
            }
        
        console.log("e ", e.target.value, e.target.name)
        this.setState({
            [e.target.name]: val
        });
    }
    onSubmit =(e)=>{
        e.preventDefault();
       // if(this.state.email)
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
        let rest = pattern.test(this.state.email.value.toLowerCase())
        console.log("rest ", rest);
        const login = {
            email: this.state.email.value, 
            password: this.state.password.value, 
            
        }
        this.props.login(login);
    }
    render() {
        return (
            <div className = "login">
                <div className="login__logo">SHOPMATE</div>
                <form onSubmit = {(e)=>this.onSubmit(e)} className="login__form">
                    <h3 className="login__title">Log in to your account</h3>
                    <TextField
                        required
                        id="txtEmail"
                        label="Email"
                        name = "email"
                        //className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        error = { isEmpty(this.state.errors) ? false:  (this.state.errors.field.includes("email") ? true: false) }
                        helperText = { isEmpty(this.state.errors) ? "":  (this.state.errors.field.includes("email") ? this.state.errors.message: false) }
        
                        onChange = {(e)=>this.onChange(e)}
                        
                        />
                    <TextField
                    onChange = {(e)=>this.onChange(e)}
                        
                        required
                        type = "password"
                        id="txt_pass"
                        label="Password"
                        color = "primary"
                        name = "password"
                        //className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        />
                        <Button type = "submit" color = "primary" variant = "contained">Login</Button>
                        <div className = "login__form__bottom">
                            <p>Don't have an account? <Link to = "/register">Sign Up</Link></p>
                        </div>
                        
                </form>
            </div>
        );
    }
}
const mapStateToProps =state =>({
    auth: state.auth, 
    
})
export default connect(mapStateToProps, {login})(Login);