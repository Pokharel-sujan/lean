import React from 'react';
import ToggleButton from './ToggleButton';


const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar-navigation">
            <div>
                <ToggleButton click = {props.drawerClickHandler}></ToggleButton>
            </div>
            
            <div className="spacer"></div>
            <div className="toolbar-navigation-items">
                <ul>
                
                    {/* <li><a href="/">Summary</a></li>
                    <li><a href="/">Questions</a></li> */}
                </ul>
            </div>
        </nav>
    </header>



);
export default toolbar;