
import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrower';
import {connect} from 'react-redux';


class Layout extends Component{

    state={
        showSideDrawer:false
    }

    sideDrawerCloseHandler =()=>{
            this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
        return {showSideDrawer:!prevState.showSideDrawer};
        });
    }

    render(){
        return(
        <Aux>
        <Toolbar isAuth={this.props.isAuth} clickedHandler={this.sideDrawerToggleHandler}/> 
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aux>
        );
    };
}


 const mapStateToProps= state =>{
     return {
        isAuth:state.auth.token!==null

     };
 }

export default connect(mapStateToProps)(Layout);