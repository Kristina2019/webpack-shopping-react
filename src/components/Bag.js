import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PlusIcon from '@material-ui/icons/add';
import MinusIcon from '@material-ui/icons/remove';
import Button from '@material-ui/core/Button';
import{withRouter }from 'react-router-dom';
import CloseIcon from '@material-ui/icons/close';
//import IconButton from '@material-ui/core/IconButton';
import {updateItemCart, removeProduct, addWishCart, getDeleteCart} from '../actions/cartActions';
//import pink from '@material-ui/core/colors/pink';
import {connect} from 'react-redux';
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#e91e63',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginRight : 'auto', 
    marginLeft: 'auto'
  },
  table: {
    minWidth: 500,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});



class Bag extends React.Component{
    componentDidMount(){
        if(this.props.cart.products.length === 0){
            this.props.history.push('/');
        }
    }
    minusClicked =(itemid, quantity)=>{
        if(quantity ===1){
            return;
        }
        let q = quantity -1;
        this.props.updateItemCart(itemid,q, this.props.cart.cartId);
    }
    plusClicked =(itemid, quantity)=>{
        
        let q = quantity +1;
        this.props.updateItemCart(itemid,q, this.props.cart.cartId );
    }
    removeItemClicked =(itemid) =>{
        this.props.removeProduct(itemid, this.props.cart.cartId);
    }
    onAddWishClicked =(itemid)=>{
        this.props.addWishCart(itemid, this.props.cart.cartId);
    }
    onEmptyCartClick =()=>{
        this.props.getDeleteCart(this.props.cart.cartId);
        this.props.history.push('/');
    }
    onOrderClick =()=>{
        this.props.history.push('/order');
    }
    render(){
        const { classes } = this.props;

        return (
        <div className = "container">
                    
            <Paper className={classes.root}>
            <h4 className="title">Cart List</h4>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                <CustomTableCell></CustomTableCell>
                    <CustomTableCell>Product Name</CustomTableCell>
                    <CustomTableCell>Attributes</CustomTableCell>
                    <CustomTableCell align="center">Quantity</CustomTableCell>
                    <CustomTableCell align="right">Unit Price</CustomTableCell>
                    <CustomTableCell align="right">Total Price</CustomTableCell>
                    <CustomTableCell align="right"></CustomTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.props.cart.products.map(row => (
                    <TableRow className={classes.row} key={row.item_id}>
                    <CustomTableCell>
                        <button className = "button" onClick = {()=>this.removeItemClicked(row.item_id)}>
                            <CloseIcon color = "primary"/>
                        </button>
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                        {row.name}
                    </CustomTableCell>
                    <CustomTableCell align="center">{row.attributes}</CustomTableCell>
                    <CustomTableCell align="center">
                        <div className="button__quantity">
                            <button className = "button button__minus" onClick = {()=>this.minusClicked(row.item_id, row.quantity)}>
                                <MinusIcon color = "primary" />
                            </button>
                            <p className = "button__text">{row.quantity}</p>
                            <button className = "button button__plus"  onClick = {()=>this.plusClicked(row.item_id, row.quantity)}>
                                <PlusIcon color = "primary" />
                            </button>
                        </div>
                        
                    </CustomTableCell>
                    <CustomTableCell align="center">{row.price}</CustomTableCell>
                    <CustomTableCell align="center">{row.subtotal}</CustomTableCell>
                    <CustomTableCell align="right"><button className = "button button__wish"  onClick = {()=>this.onAddWishClicked(row.item_id)}>Add to Wishlist</button></CustomTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
                 <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                    <Button color = "primary" style = {{marginTop: '20px', marginLeft: '20px', marginBottom: '20px'}} variant = "contained" onClick ={()=>this.onEmptyCartClick()}>Empty Cart</Button>
                    <Button color = "primary" style = {{marginTop: '20px', marginRight: '20px', marginBottom: '20px'}} variant = "contained" onClick ={()=>this.onOrderClick()}>Order</Button>
                </div>
                </Paper>
            </div>
        );
    }
}

Bag.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state=>({
    auth: state.auth, 
    product: state.product,
    cart: state.cart
})

export default connect(mapStateToProps, {updateItemCart, getDeleteCart, removeProduct, addWishCart})(withStyles(styles)(withRouter(Bag)));