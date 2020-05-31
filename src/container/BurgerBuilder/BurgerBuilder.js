import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal   from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"; 
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spiner/Spiner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"; 
import * as actionTypes from '../../store/actions';



const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    bacon:0.7,
    meat:1.3
}

class BurgerBuilder extends Component {
     
    state ={
        // ingredients: null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading :false,
        error:false
    }

    componentDidMount(){
        // axios.get('/ingredient.json')
        // .then(response =>{
        //     this.setState({ingredients:response.data}); 
        // }).catch(error=>{
        //     this.setState({error:true});
        // });
    }



    updatePurchaseState(ingredients) {
      //  const ingredients ={...this.state.ingredients}; //state is not the same
        const sum =Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum +el;
        },0);
        this.setState({purchasable: sum>0});
    }


    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount+1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] =updatedCounted;
        const priceAddition =INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrcie = oldPrice+priceAddition;
        this.setState({totalPrice:newPrcie,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCounted = oldCount-1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] =updatedCounted;
        const priceDeduction =INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrcie = oldPrice-priceDeduction;
        this.setState({totalPrice:newPrcie,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler=() =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler =() =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler =() =>{
     
        const querryParams =[];
        for(let i in this.state.ingredients){
            querryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        querryParams.push('price='+this.state.totalPrice);
        const queryString  =querryParams.join('&'); 
        this.props.history.push({
            pathname:'checkout',
            search:'?'+queryString
        });

    }

    render() {
        const disabledInfo ={
            ...this.state.ings
        }; 
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;

        if(this.state.loading){
            orderSummary =<Spinner/>;
        }

        let burger=this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        
        
        if(this.props.ings){
        burger=(
            <Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
            ingredientAdded={this.props.onIngredientAdded} 
            ingredientRemove ={this.props.onIngredientRemove}
            disabked={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}/>
            </Aux>
            );

            orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.totalPrice.toFixed(2)}
        purchaseCancell={this.purchaseCancelHandler}/>;
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

const mapStateToProps = state =>{
    return{
        ings:state.ingredients
    };
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemove: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( BurgerBuilder,axios));