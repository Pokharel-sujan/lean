import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import MenuLinks from './MenuLinks';


const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li></li>
                
                <MenuLinks/>
            </ul>
        </nav>
    );
};



export default sideDrawer;