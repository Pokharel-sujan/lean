import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import Navigation from './Navbar';
import firebase from './firebase';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: props.match.params.room,
      answers: [],
      point:0,
      time: ""
    };
  };

  componentDidMount() {
    // const roomRef = firebase.database().ref('rooms');
    // roomRef.on('value', (snapshot) => {
    //   let rooms = snapshot.val();
    // }
    // )

    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();
    var today = date + "-" + (month + 1) + "-" + year;

    var todayChecked = "";
    var fillFormButton = document.getElementById("fill-form-button");

    //get list of answers
    let answersRef = firebase.database().ref('answers').orderByKey().limitToLast(100);
        answersRef.on('child_added', snapshot => {
            /* Update React state when room is added at Firebase Database */
            let answer = { text: snapshot.val(), id: snapshot.key };
            this.setState({ answers: [answer].concat(this.state.answers) });
            if(answer.text.room == this.state.roomID && answer.text.time == today){
              // todayChecked = "True";
              fillFormButton.style.display = "none";
              this.setState({point: answer.text.point, time : answer.text.time});           
            }
        })
  }

  handleFillForm = (e) => {
    e.preventDefault();
    let room = this.state.roomID;
    let path = `/questions/${room}`;
    this.props.history.push(path);
    //window.location.reload();
  }

  render() {
    return (
      <div>
        <h2>Room: {this.state.roomID}</h2>
        <h5>Check point:{this.state.point}</h5>
        <h5>Check time: {this.state.time}</h5>
        <button id="fill-form-button" onClick={this.handleFillForm.bind(this)}>
          Fill the form
        </button>
      </div>
    );
  }
}

export default withRouter(Room);