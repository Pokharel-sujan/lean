import React, { Component } from 'react';
import firebase from './firebase';
import Navigation from './Navbar';
import Table from 'react-bootstrap/Table';
import ToggleAnimation from './ToggleAnimation';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
  };

  componentDidMount() {
    const roomRef = firebase.database().ref('answers');
    roomRef.on('value', (snapshot) => {
      let answers = snapshot.val();
      let newState = [];
      for (let item in answers) {
        newState.push({
          id: answers[item].room,
          point: answers[item].point,
          time: answers[item].time,
          answer: answers[item].answer
        });
      }
      this.setState({
        answers: newState
      });
    }
    )
  }

  render() {
    return (
      <div className="Summary">
        <ToggleAnimation />
        <div className="navigation-text">SUMMARY</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Room</th>
              <th>Point</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.answers.map((item) => {
              return (
                <tr>
                  <td className="summary-room">{item.id}</td>
                  <td className="summary-status">{item.point}</td>
                  <td className="summary-point">{item.time}</td>
                </tr>
              )
            })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Summary;

