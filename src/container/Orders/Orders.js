

import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spiner/Spiner';

class Orders extends Component {



    componentDidMount() {
        this.props.onFetchOrders();
    }


    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = (<div>
                {this.props.orders.map(order => (
                    <Order ingredients={order.ingredients} price={order.price} key={order.id} />
                ))}
            </div>);
        }
        return orders;
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));