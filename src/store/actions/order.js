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


export const purchaseBurgurer = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgurerStart()); 
        axios.post('/orders.json?auth='+token, orderData).then(response => {
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

export const fetchOrders = (token,userId) => {
    return dispatch => {
        fetchOrderStart();
        const quaryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+quaryParams)
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