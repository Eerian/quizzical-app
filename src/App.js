import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function App() {
  const [apiData, setApiData] = React.useState([])
  const [showAnswers, setShowAnswers] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [quizOver, setQuizOver] = React.useState(false)
  const [quizStart, setQuizStart] = React.useState(false)
  const [startAgain, setStartAgain] = React.useState(false)
  let [count, setCount] = React.useState(0)

  React.useEffect(() => {
    let url = "https://opentdb.com/api.php?amount=5";
    let encoded = encodeURIComponent(url);
    let decoded = decodeURIComponent(encoded)
    fetch(decoded)
      .then((res) => res.json())
      .then((data) => data.results.map(item => ({...item, selectedAnswer : "", choices : shuffle([...item.incorrect_answers, item.correct_answer])})))
      .then((data) => setApiData(data))
  }, [startAgain]);

  function checkAnswers() {
    setShowAnswers(true)
    setQuizOver(!quizOver)

    apiData.map(item => {
      if(item.selectedAnswer === item.correct_answer) {
        setCount(count+=1)
      }
    })
  }

  function restartQuiz() {
    setStartAgain(!startAgain)
    setShowAnswers(!showAnswers)
    setQuizOver(!quizOver)
    setCount(0)
    setDisabled(!disabled)
  }

  //shuffle function gotten from stackoverflow
  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
    
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }

  function handleDisable() {
    setDisabled(true)
  }

  function handleStart() {
    setQuizStart(!quizStart)
  }

  const allQuestions = apiData.map(question => {
    return (
      <Question 
        question={question}
        apiData={apiData}
        setApiData={setApiData}
        showAnswers={showAnswers}
        id={nanoid()}
      />
    )
  })

  const pointerEvent = disabled ? "none" : "auto"
  return (
    <div className="app-wrapper">
      <img className="blue-blop" src={require("../src/images/blue_blop.png")}/>
      <img className="yellow-blop" src={require("../src/images/yellow_blop.png")}/>
        {
        quizStart || startAgain
        ?
        <div className="questions-container">
          <div style={{pointerEvents : pointerEvent}}>
            {allQuestions}
          </div>
            {!quizOver 
              ?
                <button onClick={() => {checkAnswers() ; handleDisable()}} className="check-answers-button">Check Answers</button>
              :
              <div className="score-container">
                <h4 className="correct-answers-count">You Scored {count}/5 correct answers</h4>
                <button className="play-again-button" onClick={restartQuiz}>Play Again</button>
              </div>
            }
        </div>
        :
        <div className="start-page">
          <div className="start-page-header">
            <h2>Quizzical</h2>
            <p>Random trivia questions</p>
            <button className="start-quiz-button" onClick={handleStart}>Start Quiz</button>
          </div>
        </div>
      }
    </div>
  )
}

