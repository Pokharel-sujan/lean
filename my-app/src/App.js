import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import './css/App.css';
import Navigation from './components/Navbar';
import Home from './components/Home';
import Admin from './components/Admin';
// import AddRooms from './components/AddRooms';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Summary from './components/Summary';
import QuestionsForm from './components/QuestionsForm';
import Room from './components/Room';
import NotFound from './components/NotFound';
import Toolbar from './components/Toolbar';
import SideDrawer from './components/SideDrawer';
import BackDrop from './components/Backdrop';
import ToggleAnimation from './components/ToggleAnimation';
import Chart from './components/Chart';


class App extends Component {


  render() {

    return (
      <div>

        <BrowserRouter>
          
          <Switch>
            <main style={{marginTop: '64px'}}>
            
              {<Route exact path="/" component={Home} />}
              <Route path="/summary" render={() => <Summary title="Summary" />} />
              <Route path="/admin" component={Admin} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/chart" component={Chart} />
              {/* <Route path="/addrooms" component={AddRooms} /> */}
              <Route path="/room" component={Room} /> {/* Temporarily deleting ":room" - the recursive module*/}
              <Route path="/questions/:room" component={QuestionsForm} />
            </main>


          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;