import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {register} from '../actions/authActions';
import {connect} from 'react-redux';
import isEmpty from '../utils/is-empty';
class Register extends Component {
    state = {
        email: {
            value: '',
            touched: false
        }, 
        password: {
            value: '',
            touched: false
        }, 
        name: {
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
        name: {
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
        const reg = {
            email: this.state.email.value, 
            password: this.state.password.value, 
            name: this.state.name.value
        }
        this.props.register(reg);
    }
    render() {
        console.log("state ", this.state)
        return (
            <div className = "login">
                <div className="login__logo">SHOPMATE</div>
                <form onSubmit = {(e)=>this.onSubmit(e)} className="login__form">
                    <h3 className="login__title">Register</h3>
                    <TextField
                        required
                        id="txtEmail"
                        error = { isEmpty(this.state.errors) ? false:  (this.state.errors.field.includes("email") ? true: false) }
                        label="Email"
                        name = "email"
                        helperText = { isEmpty(this.state.errors) ? "":  (this.state.errors.field.includes("email") ? this.state.errors.message: false) }
        
                        onChange = {(e)=>this.onChange(e)}
                        //className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        />
                    <TextField
                        required
                        id="txtName"
                        label="Name"
                        name = "name"
                        onChange = {(e)=>this.onChange(e)}
                        //className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        />
                    <TextField
                        required
                        type = "password"
                        id="txt_pass"
                        onChange = {(e)=>this.onChange(e)}
                        name = "password"
                        label="Password"
                        color = "primary"
                        //className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        />
                        <Button  type = "submit" color = "primary" variant = "contained">Register</Button>
                        <div className = "login__form__bottom">
                            <p> Already have an account? <Link to = "/login">Login</Link></p>
                        </div>
                        
                </form>
            </div>
        );
    }
}
const mapStateToProps = state=>({
    auth: state.auth
})
export default connect(mapStateToProps, {register})(Register);