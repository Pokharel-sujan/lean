import React, { Component } from 'react';
import firebase from './firebase';
import { withRouter, Link } from 'react-router-dom';
import Toolbar from './Toolbar';
import backgroundimg from '../img/background.jpeg';
import usericon from '../img/user-icon-white.png';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      accounts: [] 
    }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to questions in Firebase Database */
    let newState = [];
    let accountsRef = firebase.database().ref('accounts').orderByKey().limitToLast(100);
    accountsRef.on('child_added', snapshot => {
      /* Update React state when question is added at Firebase Database */
      let userName = { text: snapshot.val(), id: snapshot.key };
      newState.push(userName);
    })
    this.setState({accounts: newState}, function(){
      console.log(this.state.logins);
    });
  }

  componentDidMount(){
    this.setState({state: this.state});
  }

  /******************************************** Add Questions *************************************************/
  login(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the question to Firebase */
    var userName = document.getElementById("login-username");
    var userPassword = document.getElementById("login-password");
    userName.value = ""; // <- clear the input
    userPassword.value = "";
    this.setState({ state: this.state });
  }
  render() {
    return (
      
      <div className="login">
        
        <div className="background-img">
          <img className="bg-img" src={backgroundimg}></img> 
          <img className="icon"src={usericon}></img>
        </div>
        <div className="toolbar">
              <div className="topbar-text">SIGN IN</div>
        </div>
        <form className="login-form" onSubmit={this.login.bind(this)}>
          <div>
            <label className="form-check-label" htmlFor="login-username">USERNAME</label>
            <input type="text" id="login-username" onFocus={(e) => e.target.placeholder = ""} />
          </div>
          
          <div>
            <label className="form-check-label" htmlFor="login-password">PASSWORD</label>
            <input type="text" id="login-password" onFocus={(e) => e.target.placeholder = ""} />
          </div>
          <button type="submit" className="signin-btn" >SIGN IN</button>
        </form>
      </div>

    );
  }
}

export default withRouter(Login);
