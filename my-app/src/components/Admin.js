import React, { Component } from 'react';
import Navigation from './Navbar';
import firebase from './firebase';
import { withRouter, Link } from 'react-router-dom';
import ToggleAnimation from './ToggleAnimation';
import backgroundimg from '../img/laboratory.jpg';
import addquestionicon from '../img/add-question-icon.png';

var existRoom = [];
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      rooms: []
    }; // <- set up react state
  }
  componentWillMount() {

    /* Create reference to rooms in Firebase Database */
    let newState1 = [];
    let roomsRef = firebase.database().ref('rooms').orderByKey().limitToLast(100);
    roomsRef.on('child_added', snapshot => {
      /* Update React state when room is added at Firebase Database */
      let room = { text: snapshot.val(), id: snapshot.key };
      existRoom.push(room);
      newState1.push(room);
    });

    /* Create reference to questions in Firebase Database */
    let newState2 = [];
    let questionsRef = firebase.database().ref('questions').orderByKey().limitToLast(100);
    questionsRef.on('child_added', snapshot => {
      /* Update React state when question is added at Firebase Database */
      let question = { text: snapshot.val(), id: snapshot.key };
      newState2.push(question);
    });

    this.setState({ rooms: newState1, questions: newState2 }, function () {
    });
  }


  /******************************************** Add Questions *************************************************/
  addQuestion(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the question to Firebase */
    var question = document.getElementById("new-question");
    var correctAnswer = document.getElementById("correct-answer");
    firebase.database().ref('questions').push({ question: question.value, correctAnswer: correctAnswer.value });
    question.value = ""; // <- clear the input
    correctAnswer.value = "";
    this.setState({ state: this.state });
  }

  /******************************************** Add Rooms *************************************************/
  addRooms(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the question to Firebase */
    var tempQuestions = [];
    var newRoom = "";

    //get questions
    var allCheckbox = document.getElementsByName('checkbox');
    for (var i = 0; i < allCheckbox.length; i++) {
      if (allCheckbox[i].checked) {
        tempQuestions.push({ questionID: allCheckbox[i].dataset.id, question: allCheckbox[i].value, correctAnswer: allCheckbox[i].dataset.answer });
      }
    }

    var roomToAdd = document.getElementById("new-room");
    newRoom = roomToAdd.value;
    var exist = "";
    var check = "";

    //check if room is exist or not
    for (var j = 0; j < existRoom.length; j++) {

      if (newRoom == existRoom[j]["text"]["roomID"]) {
        check = "True";
        exist = check;
      } else {
        check = "False";
      }
    }

    // if room exist then warning; if not then add to database 
    if (exist == "True") {
      alert("This room is already exist. Please enter a new one!");
    } else {
      firebase.database().ref('rooms').push({ questions: tempQuestions, roomID: newRoom });
      console.log("Room: " + newRoom);
      for (var i = 0; i < tempQuestions.length; i++) {
        console.log(tempQuestions[i]);
      }

      console.log("Added!");
    }

    // clear all input field and checkboxes
    roomToAdd.value = "";
    for (var k = 0; k < allCheckbox.length; k++) {
      if (allCheckbox[k].type == 'checkbox')
        allCheckbox[k].checked = false;
    }

  }

  render() {
    return (
      <div>
        <div className="add-questions">
          <ToggleAnimation />
          <div className="navigation-text">ADMIN</div>
          <div className="background-img">
            <img className="bg-img" src={backgroundimg}></img>
            <img className="icon" src={addquestionicon}></img>
          </div>
          <form onSubmit={this.addQuestion.bind(this)}>
            <div className="question">
              <label className="form-check-label" htmlFor="new-question">QUESTION</label>
              <div className="box">
                <textarea type="text" id="new-question" onFocus={(e) => e.target.placeholder = ""} />
              </div>

            </div>
            <div>
              <label className="form-check-label" htmlFor="correct-answer">EXPECTED ANSWER</label>
              <input type="radio" name="choice" id="correct-answer" onFocus={(e) => e.target.placeholder = ""} checked /> Yes
            <input type="radio" name="choice" id="correct-answer" className="no-answer" onFocus={(e) => e.target.placeholder = ""} /> No
          </div>
            <button type="submit" className="signin-btn" >ADD</button>
            <ul>
              { /* Render the list of questions */
                this.state.questions.map(question => <li key={question.id}>{question.text.question} - {question.text.correctAnswer} </li>)
              }
            </ul>
          </form>
        </div>
        <div className="add-rooms">
          <form onSubmit={this.addRooms.bind(this)}>
            <div>
              <label className="form-check-label" htmlFor="new-room"><h1>New room number:</h1></label>
              <input type="text" id="new-room" onFocus={(e) => e.target.placeholder = ""} />
            </div>
            <div>
              <h3>List of questions:</h3>
              {
                this.state.questions.map((question, index) => <div key={index} className="question-checkbox"><label><input type="checkbox" name="checkbox" data-id={question.id} data-answer={question.text.correctAnswer} value={question.text.question}></input>{question.text.question}</label></div>)
              }

              <h3>List of rooms:</h3>
              {
                this.state.rooms.map((room, index) => <div key={index}><p>{room.text.roomID}</p></div>)
              }
            </div>
            <button type="submit" className="btn btn-primary" >Add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Admin);
