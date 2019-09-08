import React, {Component} from 'react';
import firebase from './firebase';

class Logout extends Component {

    logout = () => {
        firebase.auth().signOut();
    }

    render(){
        return(
            <div>
                <h1>You are home!</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default Logout;