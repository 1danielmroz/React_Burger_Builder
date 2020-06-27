import React from 'react';
import './App.css';

import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import {Route, Switch, withRouter,Redirect} from 'react-router-dom';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

function App(props) {
  let routes = (
    <Switch>
    <Route path="/auth" component={Auth}/>
    <Route path="/" exact component={BurgerBuilder}/>
    <Redirect to='/'/>
    </Switch>
  );

  if(props.isAuth){
    routes=(
      <Switch>
      <Route path="/Checkout" component={Checkout}/>
      <Route path="/Orders" component={Orders}/> 
      <Route path="/logout" component={Logout}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to='/'/>
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout>  
        {routes} 
      </Layout>
    </div>
  );
}

const mapStateToProps = state =>{
  return{
    isAuth:state.auth.token !==null
  }
};

const mapDispatchToProps = dispatch =>{

  return {
    onTryAuthSignup:() => dispatch(actions.authCheckState())
  };
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
