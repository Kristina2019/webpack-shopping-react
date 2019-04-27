import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import {connect} from 'react-redux';
import {getProducts} from '../actions/productActions';
class Products extends React.Component{
    constructor(props){
        super(props);
        this.pag1=React.createRef();
    }
    state = {
        start : 1, 
        intervalId: 0
    }
    componentDidMount(){
        this.props.getProducts(this.state.start, '');
        //console.log(this.refs);
        //this.refs.pag1.click();
        //this.pag1.current.focus();
    }
    clickPagination=(item)=>{
        this.props.getProducts(item.target.value, this.props.product.search);
        let intervalId = setInterval(()=>this.scrollStep(), 16.16);
        this.setState({intervalId: intervalId});
        //console.log("item ", item.target.value)
        this.setState({start: item.target.value});
        
    }
    scrollStep =()=>{
        if(window.pageYOffset === 0){
            clearInterval(this.state.intervalId);
        }
        window.scroll(0,  window.pageYOffset - 150);
    }
    prevClick =()=>{
        this.props.getProducts(cc, this.props.product.search);
        let intervalId = setInterval(()=>this.scrollStep(), 16.16);
        this.setState({intervalId: intervalId});
        if(this.state.start <=1){
            return;
        }
        let cc = this.state.start-1;
       
        this.setState({start: cc});
        
    }
    nextClick =()=>{
        this.props.getProducts(cc, this.props.product.search);
        let intervalId = setInterval(()=>this.scrollStep(), 16.16);
        this.setState({intervalId: intervalId});
        if(Math.ceil(this.props.product.count/20) === this.state.start){
            return;
        }
        let cc = this.state.start+1;
        
        this.setState({start: cc});
    }


    render(){
        let products = this.props.product.products;
        let productstemp;
        if(products){
            productstemp = products.map(pro =>(
                <Product key = {pro.product_id} product_id = {pro.product_id} thumbnail = {pro.thumbnail} description = {pro.description}  price = {pro.price} discounted_price = {pro.discounted_price} name = {pro.name}/>
            ));
        }
       // console.log(this.props,this.refs);
        let cc = Math.ceil(this.props.product.count/20)
        let paginationlist = [];
        for(var i =1; i<=cc; i++){
            paginationlist.push(<li className = "pagination__item" key = {i}><button value = {i} onClick = {(e)=>this.clickPagination(e)}>{i}</button></li>);
        }
        //console.log(cc);
       
    return (
        <div className = "container">
                    
        <div className = "products__container">
            <div className = "products">
                {productstemp}
            </div>
            <div className="pagination">
                <ul className = "pagination__list">
                    <li><button onClick = {this.prevClick} >&laquo;</button></li>
                    {paginationlist}
                    <li><button onClick = {this.nextClick}>&raquo;</button></li>
                </ul>
            </div>
        </div>
        </div>
    );
    }
}

Products.propTypes = {

};
const mapStateToProducts = state =>({
    product: state.product
})
export default connect(mapStateToProducts, {getProducts})(Products);