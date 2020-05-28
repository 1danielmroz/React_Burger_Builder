import React from 'react';
import './App.css';

import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './container/Orders/Orders';



function App() {
  return (
    <div className="App">
      <Layout>  
        <Switch>
        <Route path="/Checkout" component={Checkout}/>
        <Route path="/Orders" component={Orders}/>
        <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
        
      </Layout>
    </div>
  );
}

export default App;
