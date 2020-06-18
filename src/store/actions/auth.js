import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart =() =>{
    return {
        type:actionTypes.AUTH_START
    };
}

export const authSuccess = (authdata)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        authdata:authdata
    };
}

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL
    };
}

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlsWu9qYWfVxGW1ZqQRQCrcGLEYYzD4ac';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlsWu9qYWfVxGW1ZqQRQCrcGLEYYzD4ac';
        }
        axios.post(url,authData)
        .then(response =>{
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err)); 
        })
    }
}