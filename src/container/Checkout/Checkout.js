import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // componentDidMount(){
    //     this.props.onInitPurchase();
    // }

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        let summaryt = <Redirect to="/" /> 
        if (this.props.ings) {
            const purchasedRedirect=this.props.purchased ?  <Redirect to="/"/> : null;
            summaryt = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary checkoutContinued={this.checkoutContinuedHandler}
                        onCheckoutCancelled={this.onCheckoutCancelledHandler}
                        ingredients={this.props.ings} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>);
        }
        return summaryt;
    }

}

const mapStateToProps = state => {
    console.log(state);
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }
};

// const mapDispatchToProps= dispatch=>{
//     return{
//         onInitPurchase:()=>dispatch(actions.purchaseInit())
//     };
// }

export default connect(mapStateToProps)(Checkout);