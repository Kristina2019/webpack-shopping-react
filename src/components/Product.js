import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import {setProductId, getProductById} from '../actions/productActions';
import {connect} from 'react-redux';

const styles = {
  card: {
    width: 250,

  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

class Product extends React.Component{
 addCartClicked =(id)=>{
    this.props.setProductId(id);
    this.props.getProductById(id);
    this.props.history.push('/detail')
 }
  render(){
    //console.log(this.props);
    const { classes } = this.props;
    let image  ="https://backendapi.turing.com/images/products/"+this.props.thumbnail
  return (
    <div className = "product">
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="240"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4" style={{fontSize: '20px'}}>
            {this.props.name}
          </Typography>
          <Typography component="p" style = {{height: '80px'}}>
           {this.props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
         <Typography gutterBottom variant="h5" component="p" style = {{marginRight: 'auto', paddingLeft: '15px'}}>
            $ { this.props.discounted_price ==="0.00" ? this.props.price: this.props.discounted_price}
          </Typography>
        <Button size="small" onClick = {()=>this.addCartClicked(this.props.product_id)} color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
    </div>
  )
}
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, {setProductId, getProductById})(withStyles(styles)(withRouter(Product)));