

import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavItem/NavigationItem';


const navigationItems =(props) =>(
    <ul className={classes.NavigationItems}>
       <NavigationItem exact link="/" >Burger Builder</NavigationItem>
       <NavigationItem  link="/orders">Orders</NavigationItem>
    </ul>
);


export default navigationItems;