import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spiner/Spiner';
class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler=(event) =>{
            event.preventDefault();
            console.log(this.props);
              alert('You continue!');
      this.setState({loading:true});
      const order={
          ingredients: this.props.ingredients,
          price: this.props.totalPrice,
          customer :{
              name:'Daniel Morz',
              address:{
                  street: 'testStreet',
                  zipcode:'234343',
                  country: 'Ireland'
              },
              email:'test@test.com'
          },
          deliveryMethod: 'fastest'
      }
      axios.post('/orders.json',order).then(response=> {
          this.setState({loading:false});
          this.props.history.push('/');
      }).catch(err=> {
          this.setState({loading:false}); 
      });
    }

render(){

    let form=(<form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={classes.Input} type="text" name="email" placeholder="Your Mail"/> 
        <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
        <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
        <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
    </form>);

    if(this.state.loading){
        form=<Spinner/> ;
    }


    return(
        <div className={classes.ContactData}> 
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}

}


export default ContactData;