import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};


export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgurerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}


export const purchaseBurgurer = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgurerStart());
        axios.post('/orders.json', orderData).then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))

        }).catch(err => {
            dispatch(purchaseBurgerFail(err))
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
}

export const fetchOrderFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    };
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrders = () => {
    return dispatch => {
        fetchOrderStart();
        axios.get('/orders.json')
            .then(res => {

                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
                //this.setState({ loading: false, orders: fetchedOrders });
            }).catch(err => {
                dispatch(fetchOrderFail(err));
               // this.setState({ loading: false });
            });
    };
}