import React from "react";
import Question from "./components/Question";

export default function App() {
  const [apiData, setApiData] = React.useState([])
  const [showAnswers, setShowAnswers] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [quizOver, setQuizOver] = React.useState(false)
  const [quizStart, setQuizStart] = React.useState(false)
  const [loading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState(0)
  const [selectionMade, setSelectionMade] = React.useState(false)

  React.useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5");
      if (!response.ok) throw await response.json();
      const data = await response.json()
      const mappedData = data.results.map(item => ({...item, selectedAnswer : "", choices : shuffle([...item.incorrect_answers, item.correct_answer])}))

      setApiData(mappedData)
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  function checkAnswers() {
    if(selectionMade) {
      setShowAnswers(true)
      setQuizOver(!quizOver)
      setDisabled(!disabled)
    }

    // apiData.map(item => {
    //   if(item.selectedAnswer === item.correct_answer) {
    //     setCount(count+1)
    //   }
    // })
    let sum = apiData.reduce((total, curr) => {
      if(curr.selectedAnswer === curr.correct_answer) return total + 1
      return total
    }, 0)
    setCount(sum)
  }

  function restartQuiz() {
    fetchData()
    setShowAnswers(!showAnswers)
    setQuizOver(!quizOver)
    setCount(0)
    setDisabled(!disabled)
    setSelectionMade(false)
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

  function handleStart() {
    setQuizStart(!quizStart)
  }

  const allQuestions = apiData.map((question, index) => {
    return (
      <Question 
        question={question}
        apiData={apiData}
        setApiData={setApiData}
        showAnswers={showAnswers}
        setSelectionMade={setSelectionMade}
        key={index}
      />
    )
  })

  if(loading) {
    return <h1 className="loading-screen">Loading...</h1>
  }
  const pointerEvent = disabled ? "none" : "auto"
  return (
    <div className="app-wrapper">
        <img className="blue-blop" alt="blue-blop" src={require("../src/images/blue_blop.png")}/>
        <img className="yellow-blop" alt="yellow-blop"src={require("../src/images/yellow_blop.png")}/>
      {
        // quizStart || startAgain
        quizStart
        ?
          <div className="questions-container">
            <div style={{pointerEvents : pointerEvent}}>
              {allQuestions}
            </div>
              {
                !quizOver 
                  ?
                    <button onClick={checkAnswers} className="check-answers-button">Check Answers</button>
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


