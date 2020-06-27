import React from 'react';
import './App.css';

import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import {Route, Switch, withRouter} from 'react-router-dom';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

function App() {
  return (
    <div className="App">
      <Layout>  
        <Switch>
        <Route path="/Checkout" component={Checkout}/>
        <Route path="/Orders" component={Orders}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
        
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dispatch =>{

  return {
    onTryAuthSignup:() => dispatch(actions.authCheckState())
  };
};


export default withRouter(connect(null,mapDispatchToProps)(App));
