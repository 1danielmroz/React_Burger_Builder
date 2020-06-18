import * as actionTypes from '../actions/actionsTypes';
import { UpdateObject } from '../utilliti';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return UpdateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return UpdateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return UpdateObject(state, {
        error: action.error,
        loading: false
    });
}


const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        default: return state;
    }
}


export default reducer;