import React, { Component } from 'react';
import { allQuestions } from "../../data/questions";
import Button from '../controls/button/button';
import Popup from '../controls/popup/popup';
import Constants from '../../constants/constants';
import jokerFriend from "../../assets/images/friend1.png";
import jokerPublic from "../../assets/images/public1.png";
import joker5050 from "../../assets/images/50-501.png";
import used5050 from "../../assets/images/used50-50.png";
import usedPublic from "../../assets/images/usedpublic.png";
import usedFriend from "../../assets/images/usedfriend.png";
import easyQuestion from "../../assets/sounds/easy.mp3";
import correctAnswer from "../../assets/sounds/correctAnswer.mp3";
import wrondAnswer from "../../assets/sounds/wrongAnswer.mp3";
import mediumQuestion from "../../assets/sounds/mediumQuestions.mp3";
import hardQuestion from "../../assets/sounds/hardQuestions.mp3";
import selectedAnswer from "../../assets/sounds/markedAnswer.mp3";
import joker5050Sound from "../../assets/sounds/jocker5050.mp3";
import jokerPublicSound from "../../assets/sounds/jockerPublic.mp3";
import jokerFriendSound from "../../assets/sounds/phoneFriend.mp3";
import "./mainpage.css";

const soundEasyQuestions = new Audio(easyQuestion);
const soundSelectedAnswer = new Audio(selectedAnswer);
const soundWrongAnswer = new Audio(wrondAnswer);
const soundCorrectAnswer = new Audio(correctAnswer);
const soundmediumQuestions = new Audio(mediumQuestion);
const soundJoker5050 = new Audio(joker5050Sound);
const soundJokerPublic = new Audio(jokerPublicSound);
const soundJokerFriend = new Audio(jokerFriendSound);
const soundHardQuestion = new Audio(hardQuestion);

class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      questions: allQuestions,
      generatedQuestion: {},
      currentSum: 0,
      isMounted: false,
      sum: 1,
      number: 1,
      showGameOverPopup: false,
      classes: "",
      title: "",
      message: "",
      sound: "",
      useFriendJoker: false,
      usePublicJoker: false,
      isJokerFriendUsed: false,
      isJoker5050Used: false,
      isJokerPublicUsed: false,
      leftWidth: 10,
      rightWidth: 2
    }

    this.generateRandomQuestion = this.generateRandomQuestion.bind(this);
    this.onAnswerClick = this.onAnswerClick.bind(this);
    this.updateSelectedSum = this.updateSelectedSum.bind(this);
    this.getWonSum = this.getWonSum.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.usePublicJoker = this.usePublicJoker.bind(this);
    this.use5050Joker = this.use5050Joker.bind(this);
    this.useFriendJoker = this.useFriendJoker.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    soundEasyQuestions.play();
    this.setState({ isMounted: true });
    this.generateRandomQuestion();
  }

  generateRandomQuestion() {
    soundCorrectAnswer.pause();
    let complexity = "";
    if (this.state.sum >= 1 && this.state.sum <= 5) {
      complexity = "easy";
      soundEasyQuestions.play();
    } else if (this.state.sum > 5 && this.state.sum < 10) {
      complexity = "medium";
      soundmediumQuestions.play();
    } else {
      complexity = "high";
      soundHardQuestion.play();
    }

    let arr = this.state.questions;
    arr = arr.filter(el => { return el.complexity === complexity && el.isGenerated === false });
    let num = Math.floor(Math.random() * arr.length - 1) + 1;
    let question = arr[num];
    let indx = this.state.questions.indexOf(question);
    this.state.questions[indx].isGenerated = true;
    this.state.sum++;
    this.setState({ generatedQuestion: question, classes: "" });
    document.querySelectorAll(".hide-btn").forEach(element => {
      element.classList.remove("hide-btn")
    });
  }

  onAnswerClick(e) {
    soundHardQuestion.pause();
    soundmediumQuestions.pause();
    soundJokerFriend.pause();
    soundEasyQuestions.pause();
    soundSelectedAnswer.play();
    this.setState({ classes: "pointer-events-none", useFriendJoker: false, usePublicJoker: false });
    let isCorrect = false;
    let btnId = e.target.id;
    let answer = this.state.generatedQuestion.answer;
    document.getElementById(btnId).classList.add("bg-marked-answer");

    if (btnId === answer) {
      isCorrect = true;
    }

    setTimeout(() => {
      if (isCorrect) {
        soundCorrectAnswer.currentTime = 0;
        soundCorrectAnswer.play();
        document.getElementById(btnId).classList.replace("bg-marked-answer", "bg-correct-answer");
        if (this.state.number !== 16) {
          this.updateSelectedSum();
        }
      } else {
        soundWrongAnswer.play();
        document.getElementById(btnId).classList.replace("bg-marked-answer", "bg-wrong-answer");
        document.getElementById(answer).classList.add("bg-correct-answer");
      }
      setTimeout(() => {
        if (isCorrect && this.state.number < 15) {
          document.getElementById(btnId).classList.remove("bg-correct-answer");
          this.generateRandomQuestion();
        } else {
          let message = this.getWonSum();
          this.setState({ showGameOverPopup: true, message: message, title: Constants.titleGameOver });
        }
      }, 2000);
    }, 2000);
  }

  updateSelectedSum() {
    this.setState({ number: this.state.number + 1 });
    let allSum = document.getElementById("styleNumbers").children;
    let index = allSum.length - this.state.number;
    let newSum = allSum[index];
    document.querySelector(".selectedSum").classList.remove("selectedSum");
    newSum.classList.add("selectedSum");
  }

  getWonSum() {
    let sum = document.querySelector(".selectedSum").innerText.replace(' ', '');
    sum = parseInt(sum);
    if (sum <= 250) {
      sum = 0;
    } else if (sum <= 2500) {
      sum = 250;
    } else if (sum < 100000) {
      sum = 2500;
    }

    let message = "";
    if (sum === 100000) {
      message = "Честито! Вие спечелихте " + sum + " лв.";
    } else {
      message = Constants.messageGameOver + sum + " лв.";
    }
    return message;
  }

  startNewGame() {
    window.location.reload();
  }

  usePublicJoker() {
    if (!this.state.isJokerPublicUsed && this.state.isMounted) {
      soundJokerPublic.play();
      this.setState({ usePublicJoker: true, useFriendJoker: false, title: "Помощ от публиката", message: "", isJokerPublicUsed: true });
    }
  }

  use5050Joker() {
    if (!this.state.isJoker5050Used && this.state.isMounted) {
      soundJoker5050.play();
      let answers = ["c", "a", "b", "d"];
      answers = answers.filter(el => el !== this.state.generatedQuestion.answer);
      let counter = 0, num = 0;
      while (counter < 2) {
        num = this.getRandomInt(num);
        document.getElementById(answers[num]).classList.add("hide-btn");
        counter++;
      };
      this.setState({ isJoker5050Used: true });
    }
  }

  getRandomInt(num) {
    let genNum = 0;
    do {
      genNum = Math.floor(Math.random() * Math.floor(3));
    } while (genNum === num);
    return genNum;
  }

  useFriendJoker() {
    if (!this.state.isJokerFriendUsed && this.state.isMounted) {
      soundEasyQuestions.pause();
      soundmediumQuestions.pause();
      soundHardQuestion.pause();
      soundJokerFriend.play();
      let answ = this.state.generatedQuestion.answer;
      let message = "Мисля, че верният отговор е " + answ.toUpperCase() + ".";
      this.setState({ usePublicJoker: false, useFriendJoker: true, message: message, title: "Помощ от приятел", isJokerFriendUsed: true });
    }
  }

  closePopup() {
    this.setState({ useFriendJoker: false, usePublicJoker: false, title: "", message: "" });
  }

  render() {
    return (
      <React.Fragment>
        <div className="height-100-per">
          <div id="mainDiv" >
            {this.state.usePublicJoker ?
              <Popup message={this.state.message} title={this.state.title} onOkClick={this.closePopup} showChart={true} answer={this.state.generatedQuestion.answer} />
              : null}
            {this.state.showGameOverPopup ? <Popup message={this.state.message} title={this.state.title} onOkClick={this.startNewGame} /> : null}
            {this.state.useFriendJoker ? <Popup message={this.state.message} title={this.state.title} onOkClick={this.closePopup} /> : null}
          </div>
          <div id="bottomDiv">
            {this.state.isMounted ?
              <div className={`text-white ${this.state.classes} `} >
                <div id="question">
                  <label>{this.state.generatedQuestion ? this.state.generatedQuestion.question : ""}</label>
                </div>
                <div className="row-style">
                  <div >
                    <Button id="a" onBtnClick={this.onAnswerClick} value={`A) ${this.state.generatedQuestion.a}`} />
                  </div>
                  <div >
                    <Button id="b" onBtnClick={this.onAnswerClick} value={`B) ${this.state.generatedQuestion.b}`} />
                  </div>
                </div>
                <div className="row-style">
                  <div >
                    <Button id="c" onBtnClick={this.onAnswerClick} value={`C) ${this.state.generatedQuestion.c}`} />
                  </div>
                  <div >
                    <Button id="d" onBtnClick={this.onAnswerClick} value={`D) ${this.state.generatedQuestion.d}`} />
                  </div>
                </div>
              </div> : null}
          </div>
          <div id="rightDiv" className="height-100-per">
            <div className="align-items-baseline display-inline-flex">
              <Button imgPath={this.state.isJokerPublicUsed ? usedPublic : jokerPublic} classes="image-btn" onBtnClick={this.usePublicJoker} />
              <Button imgPath={this.state.isJoker5050Used ? used5050 : joker5050} classes="image-btn" onBtnClick={this.use5050Joker} />
              <Button imgPath={this.state.isJokerFriendUsed ? usedFriend : jokerFriend} classes="image-btn" onBtnClick={this.useFriendJoker} />
            </div>
            <div id="styleNumbers" className="styleNumbers">
              <div className='color-orange'><label>100 000</label></div>
              <div className='color-white'><label>50 000</label></div>
              <div className='color-white'><label>25 000</label></div>
              <div className='color-white'><label>10 000</label></div>
              <div className='color-white'><label>5 000</label></div>
              <div className="color-orange" ><label>2 500</label></div>
              <div className='color-white'><label>2 000</label></div>
              <div className='color-white'><label>1 500</label></div>
              <div className='color-white'><label>1 000</label></div>
              <div className='color-white'><label>500</label></div>
              <div className="color-orange"><label>250</label></div>
              <div className='color-white'><label>200</label></div>
              <div className='color-white'><label>150</label></div>
              <div className='color-white'><label>100</label></div>
              <div className="color-white selectedSum"><label>50</label></div></div>
          </div >
        </div >
      </React.Fragment >
    );
  }
}
export default Mainpage;
