import React, { Component } from 'react';
import firebase from './firebase';
import Navigation from './Navbar';
import { withRouter, Link } from 'react-router-dom';
import ToggleAnimation from './ToggleAnimation';

var existRoom = [];

class AddRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            questions: []
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

    componentDidMount() {
        this.setState({ state: this.state }, function () {
            console.log(this.state.rooms);
            console.log(this.state.questions);
        });
    }

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
            <div className="add-rooms">
                <ToggleAnimation />
                <div className="navigation-text">ADD ROOMS</div>
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

        );
    }
}

export default AddRooms;
