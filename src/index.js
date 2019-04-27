import "babel-polyfill";
console.log("Hello");
import image from './assets/photo.jpeg';
console.log(image);
import './styles/main.scss';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';
import setAuthToken from './utils/setAuthToken';
import {setUser, setCustomer, getCustomer, logoutUser} from './actions/authActions';
import jwt_decode from 'jwt-decode';
import {StripeProvider} from 'react-stripe-elements';
const theme = createMuiTheme(
    {
        palette: {
            primary: pink,
            secondary:{
                main: '#fff'
            },
            
            default: pink
        },
        typography: {
            useNextVariants: true,
        },
    }
);

if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    let user = jwt_decode(localStorage.jwtToken);
    console.log("user", user);
    store.dispatch(setUser(user));
    store.dispatch(getCustomer());
    const currentTime = Date.now() /1000;

    if(user.exp <currentTime){
        store.dispatch(logoutUser());
    }

}


const app = (
    <Provider store = {store}>
    <MuiThemeProvider theme = {theme}>
        <BrowserRouter>
        
        <App/>
        
        </BrowserRouter>
    </MuiThemeProvider>
    </Provider>
    );
ReactDOM.render(
    app, 
    document.getElementById('app')

);