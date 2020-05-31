import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Spinner from "../../components/UI/Spiner/Spiner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuildeActiobns from '../../store/actions/index';





class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // totalPrice:4,
        // purchasable:false,
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }



    updatePurchaseState(ingredients) {
        //  const ingredients ={...this.state.ingredients}; //state is not the same
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;;
    }


    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.state.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;


        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemove}
                        disabked={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)}
                purchaseCancell={this.purchaseCancelHandler} />;
        }


        return (

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuildeActiobns.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(burgerBuildeActiobns.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuildeActiobns.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));