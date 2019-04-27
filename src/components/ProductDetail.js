import React, { Component } from 'react';
//import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import isEmpty from '../utils/is-empty';
import {getProductById, getAttributeByProductId, setSizeSelected, setColorSelected} from '../actions/productActions';
import {createCart, addProductCart} from '../actions/cartActions';
import classnames from 'classnames';
import {useAlert} from 'react-alert';
class ProductDetail extends Component {
    state = {
        imageShow: '', 
        color: null, 
        size: null, 
        showAlert: false, 
        errors: {}
    }
    componentDidMount(){
        //console.log("Produc detail ", this.props);
        if(this.props.product.selectedId === 0){
            this.props.history.push('/');
        }else{
            if(isEmpty(this.props.getProductById(this.props.product.selectedId))){
                this.props.getProductById(this.props.product.selectedId);
            }
            this.props.getAttributeByProductId(this.props.product.selectedId);
            if(this.props.cart.cartId ===null){
                this.props.createCart();
            }
        }
    
    }
    componentWillReceiveProps(nextProps){
        //console.log("next prop", nextProps);
        if(!isEmpty(nextProps.product.product)){
            this.setState({imageShow: nextProps.product.product.image});
            
        }
    }
    imageClick =(name)=>{
        this.setState({imageShow: name})

    }
    onSizeClick =(obj)=>{
        this.setState({size: obj});
        this.props.setSizeSelected(obj)
    }
    onColorClick =(obj)=>{
        this.props.setColorSelected(obj);
        this.setState({color: obj})
    }
    addClick =(id)=>{
        let errors = {};
        if(this.props.product.setSize){
            errors.size = "Please select the size!";
        }
        if(this.props.product.setColor){
            errors.color = "Please select the color!";
        }
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }else
        if(this.props.product.setSize && this.props.product.setColor && this.props.cart.cartId && this.props.product.product.product_id){
        let attrval = this.props.product.setColor.attribute_value + "," + this.props.product.setSize.attribute_value;
        const product = {
            product_id: id, 
            attributes: attrval, 
            cart_id: this.props.cart.cartId
            
        }
        this.props.addProductCart(product);
        //this.props.history.push('/');
        this.setState({showAlert: true})
        setTimeout(()=>{
            this.setState({showAlert: false});
            setTimeout(()=>{
                this.props.history.push('/');
            }, 500);
        }, 2000);
        }else{
            this.setState({errors: errors});
        }
    }
    
    render() {
       // console.log("state ", this.state)

        let colorlist = (this.props.product.color.length>0 ? this.props.product.color : null);
        let colorcont = null;
        if(colorlist){
            if(this.props.product.setColor){
                colorcont = colorlist.map(col=>(
                    <div key = {col.attribute_value}  onClick = {()=>this.onColorClick(col)} className = {classnames("colorcont__colordiv", col.attribute_value, (this.props.product.setColor.attribute_value === col.attribute_value ? "coloractive" : null  ))}></div>
                ));
            }else{
                colorcont = colorlist.map(col=>(
                    <div key = {col.attribute_value}  onClick = {()=>this.onColorClick(col)} className = {classnames("colorcont__colordiv", col.attribute_value)}></div>
                ));
            }
           
        }

        let sizelist = (this.props.product.size.length>0 ? this.props.product.size : null);
        let sizecont = null;
        if(sizelist){
            if(this.props.product.setSize){
                sizecont = sizelist.map(siz=>(
                    <div key = {siz.attribute_value} onClick = {()=>this.onSizeClick(siz)} className = {classnames("sizecont__sizediv", (this.props.product.setSize.attribute_value === siz.attribute_value ? "sizeactive" : null))}>{siz.attribute_value}</div>
                ));
            }else{
                sizecont = sizelist.map(siz=>(
                    <div key = {siz.attribute_value} onClick = {()=>this.onSizeClick(siz)} className = {classnames("sizecont__sizediv")}>{siz.attribute_value}</div>
                ));
            }
        }

        let producttemp;
        
        if(this.props.product.product){
            const product = this.props.product.product;
            producttemp = (
                <div className = "container">
                    
                <div className = "productdetail">
                    <div className = {classnames("alert", (this.state.showAlert ? 'alert-shown': 'alert-hidden'))}>Product added to cart!</div>
                    <div className="imagediv">
                        <img  className = "imagediv__image__big" src = {"https://backendapi.turing.com/images/products/"+this.state.imageShow} />
                        <div className="imagediv__small">
                            <img onClick = {()=>this.imageClick(product.image)} src = {"https://backendapi.turing.com/images/products/"+product.image} />
                            <img onClick = {()=>this.imageClick(product.image_2)} src = {"https://backendapi.turing.com/images/products/"+product.image_2} />
                           
                        </div>
                    </div>
                    <div className="imagedesc">
                        <h3 className="imagedesc__title">{product.name}</h3>
                        <div className="pricediv">
                            {product.discounted_price !== "0.00" ? (<p className="pricediv__discount"><span>Sale: </span>${product.discounted_price}</p>) : null}
                            <p className={classnames("pricediv__price",(product.discounted_price !== "0.00" ? "line-through": null))}><span>Price: </span> ${product.price} </p> 
                            
                        </div>
                        <p className = "imagedesc__description">{product.description}</p>
                        <p>Color</p>
                        <div className="colorcont">
                            {colorcont}
                        </div>
                        <p className = "error">{this.state.errors.color ? this.state.errors.color: null}&nbsp;</p>
                        <p>Size</p>
                        <div className="sizecont">
                            {sizecont}
                        </div>
                        <p className = "error">{this.state.errors.size ? this.state.errors.size: null}&nbsp;</p>
                        
                        <Button variant = "contained" onClick = {()=>this.addClick(product.product_id)} style = {{marginTop: '20px'}} color = "primary">Add to Cart</Button>
                    </div>
                </div>
                </div>
            );
        }else{
            producttemp = ( <div className = "container"><p>Product not found.</p></div>);
        }
        return producttemp;
    }
}
const mapStateToProps = state=>({
    auth: state.auth, 
    product: state.product, 
    cart: state.cart
})
export default connect(mapStateToProps, {createCart, addProductCart, getProductById, getAttributeByProductId, setSizeSelected, setColorSelected})(withRouter(ProductDetail));