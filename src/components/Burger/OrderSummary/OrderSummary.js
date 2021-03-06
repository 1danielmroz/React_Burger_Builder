
import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

    // componentDidUpdate(){
    //     console.log('[OrderSummary] WillUpdate');
    // }

    render(){
        const ingredientsSummary =Object.keys(this.props.ingredients).map(igKey => {
            return (
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                   {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancell}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
               
           </Aux>);
    } 
};


export default OrderSummary;