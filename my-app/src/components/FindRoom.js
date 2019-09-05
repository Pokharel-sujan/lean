import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './firebase';

var existRooms = [];

class FindRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    /* Create reference to rooms in Firebase Database */
    existRooms = [];
    let roomsRef = firebase.database().ref('rooms').orderByKey().limitToLast(100);
    roomsRef.on('value', snapshot => {
      /* Update React state when room is added at Firebase Database */
      let rooms = snapshot.val();
      let newState = [];
      for (let room in rooms) {
        newState.push({
          roomID: rooms[room].roomID,
        });
        existRooms.push(rooms[room].roomID);
      }
      this.setState({ rooms: newState });

    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var exist = "False";
    var roomInput = document.querySelector("input");

    // Check if the input room is exist or not
    for (var i = 0; i < existRooms.length; i++) {
      if (this.room.value == existRooms[i]) {
        exist = "True";
        break;
      }
    }

    // if room exist -> go to room page, if not -> re-enter
    if (exist == "True") {
      let roomID = this.room.value;
      let path = `/${roomID}`;
      console.log('Clicked');
      console.log(roomID);
      this.props.history.push(path);
    } else if (exist == "False"){
      alert("Room not exist! Please try again!");
      roomInput.value = "";
    }


  }
  render() {
    return (
      <form className="find-room" onSubmit={this.handleSubmit.bind(this)}>
        <input className="form-check-label" type="text" placeholder="Enter room here" ref={(input) => this.room = input} />
        <button className="go-btn"type="submit">Go!</button>
      </form>
    );
  }
}

export default withRouter(FindRoom);