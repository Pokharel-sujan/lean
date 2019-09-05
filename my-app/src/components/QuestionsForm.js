import React, { Component } from 'react';
import Navigation from './Navbar';
import firebase from './firebase';
import { matchPath } from 'react-router';

const hideComment = {
  display: 'none'
};
var point = 0;
var answers = [{ id: "", question: "", answer: "", comment: "" , point: ""}];


class QuestionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

      roomID: "",
      questions: [],
      rooms: [],
      roomQuestions: []
    };
  }

  componentDidMount() {
    

    /* Create reference to rooms in Firebase Database */
    let roomsRef = firebase.database().ref('rooms').orderByKey().limitToLast(100);
    roomsRef.on('value', snapshot => {
      /* Update React state when room is added at Firebase Database */
      let rooms = snapshot.val();
      let newState = [];
      for (let room in rooms){
        newState.push({
          roomID: rooms[room].roomID,
          questions: rooms[room].questions
        });
      }
      this.setState({ rooms: newState }, function () {
        let newState = [];
        let x = [];
        let roomNumber = this.state.roomID;
        for (let i = 0; i < this.state.rooms.length; i++) {
          if(this.state.rooms[i]["roomID"] == roomNumber){
            for (let j = 0; j < this.state.rooms[i]["questions"].length; j++){
              x = this.state.rooms[i]["questions"][j];
              newState.push(x);
              
            }
          }
        }

        this.setState({ roomQuestions : newState}, function(){
          console.log(this.state.roomQuestions);
        });
      });
      
    })

    const match = matchPath(this.props.history.location.pathname, {
      // You can share this string as a constant if you want
      path: "/questions/:room"
    });

    let roomNumber = match.params.room;

    this.setState({ roomID: roomNumber }, function () {
      console.log(this.state.roomID);
    });
  }
  /******************************************** Submit form *************************************************/
  handleSubmit = (e) => {
    e.preventDefault();

    // get room params (room id) from match using matchPath
    const match = matchPath(this.props.history.location.pathname, {
      // You can share this string as a constant if you want
      path: "/questions/:room"
    });
    let roomId;
    // match can be null
    if (match && match.params.room) {
      roomId = match.params.room;
      this.state.roomID = roomId;
    }

    let path = `/${roomId}`;
    this.props.history.push(path);

  }

  /******************************************** Handle answers *************************************************/
  handleAnswer = (questionID, question, correctAnswer, answer) => {

    console.clear();
    
    
    var exist = "";
    var check = "";
    var point = 0;

    // Check if the question is answered or not
    for (let i = 0; i < answers.length; i++) {
      if (answers[i]["question"] == question) {
        answers[i]["answer"] = answer;

        if (answer != correctAnswer) {
          document.getElementById(questionID).style.display = "inline";
          answers[i]["point"] = 0;
        } else if (answer == correctAnswer) {
    
          answers[i]["point"] = 1;
          //disable comment box
          document.getElementById(questionID).style.display = "none";
          document.getElementById(questionID).value = "";
    
          //Remove comment if answer is Yes
          for (let j = 1; j < answers.length; j++) {
            if (answers[j]["id"] == questionID) {
              answers[j]["comment"] = "";
            }
          }
        }
        check = "True";
        exist = check;
      } else if (answers[i]["question"] != question) {
        check = "False";
      }     
    }
    if (exist != "True") {
      let tempPoint = 0
      if (answer != correctAnswer) {
        document.getElementById(questionID).style.display = "inline";
        tempPoint = 0;
      } else if (answer == correctAnswer) {
  
        tempPoint = 1;
        //disable comment box
        document.getElementById(questionID).style.display = "none";
        document.getElementById(questionID).value = "";
  
        //Remove comment if answer is Yes
        for (let j = 1; j < answers.length; j++) {
          if (answers[j]["id"] == questionID) {
            answers[j]["comment"] = "";
          }
        }
      }
      answers.push({ id: questionID, question: question, answer: answer, comment: "", point: tempPoint });
    }

    // Display list of answers in console for testing
    for (var i = 1; i < answers.length; i++) {
      console.log(i + ". " + answers[i]["question"]);
      console.log("Answer: " + answers[i]["answer"]);
      console.log("Comment: " + answers[i]["comment"]);
    }
  }

  /******************************************** Handle Comment *************************************************/
  handleComment(event) {
    var commentBox = document.getElementById(event.target.id);
    for (var i = 1; i < answers.length; i++) {
      if (answers[i]["id"] == event.target.id && commentBox.style.display == "inline") {
        answers[i]["comment"] = event.target.value;
      }
    }
  }

  /******************************************** Print result to console and push to Firebase *************************************************/
  printList(e) {
    console.clear();

    const match = matchPath(this.props.history.location.pathname, {
      // You can share this string as a constant if you want
      path: "/questions/:room"
    });
    // match can be null
    if (match && match.params.room) {
      this.setState({roomID : match.params.room});  
    }

    // print the list of answers
    let totalPoint = 0;
    for (var i = 1; i < answers.length; i++) {
      console.log("Question: " + answers[i]["question"]);
      console.log("Answer: " + answers[i]["answer"]);
      console.log("Comment: " + answers[i]["comment"]);
      console.log("-------------------------");
      totalPoint += answers[i]["point"];
    }
    console.log(this.state.roomID);
    console.log("Point: " + totalPoint);

    // creating timestamp
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();
    var dateString = date + "-" + (month + 1) + "-" + year;

    // Push answers, point , room ID to Firebase
    firebase.database().ref('answers').push({ answer: answers, room: this.state.roomID, time: dateString , point: totalPoint});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="question-form" id="question-form">
        {

          this.state.roomQuestions.map((question, index) => {
            {/* console.log(question.text); */ }
            return (
              <fieldset key={index} className="question-card" >
                <p>{question.question}</p>
                <div className="form-check form-check-inline">
                  <input className="form-check-input answerButton" type="radio" onClick={() => this.handleAnswer(question.questionID, question.question, question.correctAnswer, "Yes")} name={question.questionID} id="inlineRadio1" value="1" />
                  <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input answerButton" type="radio" onClick={() => this.handleAnswer(question.questionID, question.question, question.correctAnswer, "No")} name={question.questionID} id="inlineRadio2" value="0" />
                  <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                </div>
                <br></br>
                <textarea className="comment" placeholder="Comment" style={hideComment} id={question.questionID} maxLength="255" onFocus={(e) => e.target.placeholder = ""} onChange={this.handleComment}></textarea>
              </fieldset>
            );
          })

        }
        <button type="submit" className="btn btn-primary" >Next</button>
        <button type="button" onClick={this.printList.bind(this)} className="btn btn-primary" >Print</button>
      </form>
    );
  }
}

export default QuestionsForm;