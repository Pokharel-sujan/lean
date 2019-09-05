import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Navigation from './Navbar';
import Home from './Home';
// import AddQuestions from './AddQuestions';
// import AddRooms from './AddRooms';
import Admin from './Admin';
import Login from './Login';
import SignUp from './SignUp';
import Summary from './Summary';
import QuestionsForm from './QuestionsForm';
import Room from './Room';
import NotFound from './NotFound';
import Toolbar from './Toolbar';
import SideDrawer from './SideDrawer';
import BackDrop from './Backdrop';
import ToggleAnimation from './ToggleAnimation';



class MenuLinks extends Component {
  render() {
    return (

          <ul className="main-nav">
            <li><a href="/">Home</a></li>
            <li><NavLink to="/summary">Summary</NavLink></li>
            <li><NavLink to="/chart">Chart</NavLink></li>
            {/* <li><NavLink to="/addquestions">Add Questions</NavLink></li>
            <li><NavLink to="/addrooms">Add Rooms</NavLink></li> */}
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/chart">Chart</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
            <li><NavLink to="/admin">Admin</NavLink></li>


          </ul>
   
    );
  }

}

export default MenuLinks;