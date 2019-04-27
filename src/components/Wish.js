import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PlusIcon from '@material-ui/icons/add';
import MinusIcon from '@material-ui/icons/remove';
import{withRouter }from 'react-router-dom';
import CloseIcon from '@material-ui/icons/close';
//import IconButton from '@material-ui/core/IconButton';
import {getWishListFromEmpty, moveProduct} from '../actions/cartActions';
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
    marginLeft: 'auto',
    marginBottom: theme.spacing.unit * 3,
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



class Wish extends React.Component{
    componentDidMount(){
        if(!this.props.cart.cartId){
            this.props.history.push('/');
        } else if(this.props.cart.wishlist.length === 0){
          this.props.getWishListFromEmpty(this.props.cart.cartid);
        }
        

    }
   
    onMoveProduct =(itemid)=>{
        this.props.moveProduct(itemid, this.props.cart.cartId);
    }
    onBackClick =()=>{
      this.props.history.push('/');
    }
    render(){
        const { classes } = this.props;
        if(this.props.cart.wishlist.length ===0){
            return(<div className = "wishlist__empty"> <h4 className="title">Wish list is empty.</h4> <Button onClick = {()=>this.onBackClick()} variant = "contained" color = "primary">Back to home page</Button> </div>);
        }else {
            return (
              <div className = "container">
                    
                <Paper className={classes.root}>
                 <h4 className = "title"> Wish List </h4>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell>Product Name</CustomTableCell>
                        <CustomTableCell>Attributes</CustomTableCell>
                        <CustomTableCell align="right">Unit Price</CustomTableCell>
                        <CustomTableCell align="right"></CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.cart.wishlist.map(row => (
                        <TableRow className={classes.row} key={row.item_id}>
                    
                        <CustomTableCell component="th" scope="row">
                            {row.name}
                        </CustomTableCell>
                        <CustomTableCell align="center">{row.attributes}</CustomTableCell>
                        
                        <CustomTableCell align="center">{row.price}</CustomTableCell>
                        
                        <CustomTableCell align="right"><button className = "button button__wish"  onClick = {()=>this.onMoveProduct(row.item_id)}>Move to Cart</button></CustomTableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Paper>
                </div>
            );
        }
    }
}

Wish.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state=>({
    auth: state.auth, 
    product: state.product,
    cart: state.cart
})

export default connect(mapStateToProps, {getWishListFromEmpty, moveProduct})(withStyles(styles)(withRouter(Wish)));