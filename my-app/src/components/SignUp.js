import React, { Component } from 'react';
import firebase from './firebase';
import { withRouter, Link } from 'react-router-dom';
import backgroundimg from '../img/background.jpeg';
import signupicon from '../img/signup-icon.png';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user_accounts: [] 
    }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to questions in Firebase Database */
    let newState = [];
    let user_accountsRef = firebase.database().ref('user_accounts').orderByKey().limitToLast(100);
    user_accountsRef.on('child_added', snapshot => {
      /* Update React state when question is added at Firebase Database */
      let account_username = { text: snapshot.val(), id: snapshot.key };
      newState.push(account_username);
    })
    this.setState({user_accounts: newState}, function(){
      console.log(this.state.user_accounts);
    });
  }

  componentDidMount(){
    this.setState({state: this.state});
  }

  /******************************************** Add Questions *************************************************/
  signup(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the question to Firebase */
    var account_username = document.getElementById("new-username");
    var account_password = document.getElementById("new-password");
    firebase.database().ref('user_accounts').push({ account_username: account_username.value, account_password: account_password.value });
    account_username.value = ""; // <- clear the input
    account_password.value = "";
    this.setState({ state: this.state });
  }
  render() {
    return (
      <div className="sign-up">
        <div className="toolbar">
              <div className="topbar-text">SIGN UP</div>
        </div>
        <div className="background-img">
          <img className="bg-img" src={backgroundimg}></img> 
          <img className="icon"src={signupicon}></img>
        </div>
        <form className="login-form" onSubmit={this.signup.bind(this)}>
          <div>
            <label className="form-check-label" htmlFor="new-username">NEW USERNAME</label>
            <input type="text" id="new-username" onFocus={(e) => e.target.placeholder = ""} />
          </div>
          <div>
            <label className="form-check-label" htmlFor="new-password">PASSWORD</label>
            <input type="text" id="new-password" onFocus={(e) => e.target.placeholder = ""} />
          </div>
          <button type="submit" className="signin-btn" >SIGN UP</button> 
          
          <ul>
            { /* Render the list of questions */
              this.state.user_accounts.map(account_username => <li key={account_username.id}>{account_username.text.account_username} - {account_username.text.account_password} </li>)
            }
          </ul>
        </form>
      </div>

    );
  }
}

export default withRouter(SignUp);
